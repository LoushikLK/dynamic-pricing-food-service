import { ItemType, Prisma } from "@prisma/client";
import { BadRequest, NotFound } from "http-errors";
import { prisma } from "../config";
import { findItemById } from "./item.services";
import { findOrganizationById } from "./organization.services";

/**
 * Create pricing for an item based on organization, zone, and distance.
 *
 * @param {Object} params - The parameters for creating the pricing.
 * @param {number} params.organizationId - The ID of the organization.
 * @param {number} params.itemId - The ID of the item.
 * @param {string} params.zone - The pricing zone.
 * @param {number} params.baseDistance - The base distance in kilometers.
 * @param {number} params.pricePerKM - The price per kilometer.
 * @param {number} params.fixPrice - The fixed price.
 * @return {Promise<number>} A Promise that resolves when pricing is successfully created.
 */
export async function createPricing({
  organizationId,
  itemId,
  baseDistance,
  pricePerKM,
  zone,
  fixPrice,
}: {
  organizationId: number;
  itemId: number;
  zone: string;
  baseDistance: number;
  pricePerKM: number;
  fixPrice: number;
}): Promise<number> {
  try {
    //check if organization and item not exist throws error

    const [organization, item] = await Promise.allSettled([
      findOrganizationById(organizationId),
      findItemById(itemId),
    ]);

    if (organization.status === "rejected") throw organization.reason;
    if (item.status === "rejected") throw item.reason;

    const pricing = await prisma.pricing.create({
      data: {
        organizationId,
        itemId,
        baseDistance,
        pricePerKM,
        zone,
        fixPrice,
      },
      select: {
        id: true,
      },
    });

    return pricing.id;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves pricing information by ID.
 *
 * @param {number} id - The ID of the pricing to retrieve.
 * @return {Promise<object>} The pricing information.
 */
export async function findPricingById(id: number): Promise<object> {
  try {
    const pricing = await prisma.pricing.findUnique({
      where: {
        id,
      },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
        item: {
          select: {
            type: true,
            description: true,
          },
        },
      },
    });

    if (!pricing) throw new NotFound("Pricing not found!");

    return pricing;
  } catch (error) {
    throw error;
  }
}

export async function getAllPricing({
  pageNo = 1,
  perPage = 10,
  search,
  sortBy,
  itemId,
  organizationId,
  itemType,
}: {
  perPage?: number;
  pageNo?: number;
  search?: string;
  sortBy?: string;
  organizationId?: number;
  itemId?: number;
  itemType?: ItemType;
}): Promise<{ data: object; total: number }> {
  try {
    let where: Prisma.PricingWhereInput = {};
    let orderBy: Prisma.Enumerable<Prisma.PricingOrderByWithRelationInput> = {
      createdAt: "desc",
    };

    if (search) {
      where["zone"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (itemType) {
      where["item"] = {
        type: itemType,
      };
    }

    if (organizationId) {
      where["organizationId"] = organizationId;
    }
    if (itemId) {
      where["itemId"] = itemId;
    }

    if (sortBy) {
      if (sortBy?.includes("zone")) {
        orderBy["zone"] = sortBy?.includes("zone:asc") ? "asc" : "desc";
      }
    }

    const [pricing, total] = await Promise.all([
      prisma.pricing.findMany({
        skip: (pageNo - 1) * perPage,
        take: perPage,
        orderBy,
        where,
        include: {
          organization: {
            select: {
              name: true,
            },
          },
          item: {
            select: {
              type: true,
              description: true,
            },
          },
        },
      }),
      await prisma.pricing.count({
        where,
      }),
    ]);

    return { data: pricing, total };
  } catch (error) {
    throw error;
  }
}
export async function getDynamicPricing({
  zone,
  organizationId,
  itemType,
  totalDistance,
}: {
  zone: string;
  organizationId: number;
  totalDistance: number;
  itemType?: ItemType;
}): Promise<number> {
  try {
    //find the pricing details

    const pricing = await prisma.pricing.findFirst({
      include: {
        item: {
          select: {
            type: true,
            description: true,
          },
        },
      },
      where: {
        zone,
        organizationId,
        item: {
          type: itemType,
        },
      },
    });

    if (!pricing)
      throw new BadRequest("Pricing could not be calculated! Check your input");

    const { pricePerKM, baseDistance, fixPrice } = pricing;

    //calculate the total price based on the distance
    let totalPrice = 0;

    if (totalDistance <= baseDistance) {
      totalPrice = fixPrice;
    } else {
      totalPrice =
        fixPrice + ((totalDistance - baseDistance) / 1000) * pricePerKM; //divide by 1000 to convert to km
    }

    return totalPrice;
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes pricing information based on the provided ID.
 *
 * @param {number} id - The ID of the pricing information to be deleted.
 * @return {Promise<void>} A Promise that resolves once the pricing information is successfully deleted.
 */
export async function deletePricing({ id }: { id: number }): Promise<void> {
  try {
    await prisma.pricing.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the pricing information for an organization or item.
 *
 * @param {Object} params - The parameters for updating the pricing.
 * @param {number} params.id - The ID of the pricing record to update.
 * @param {number} [params.organizationId] - The ID of the organization.
 * @param {number} [params.itemId] - The ID of the item.
 * @param {string} [params.zone] - The zone of the pricing.
 * @param {number} [params.baseDistance] - The base distance in kilometers.
 * @param {number} [params.pricePerKM] - The price per kilometer.
 * @param {number} [params.fixPrice] - The fixed price.
 * @return {Promise<void>} A promise that resolves when the pricing is updated.
 * @throws {Error} If the organization or item does not exist.
 */
export async function updatePricing({
  id,
  organizationId,
  itemId,
  baseDistance,
  pricePerKM,
  zone,
  fixPrice,
}: {
  id: number;
  organizationId?: number;
  itemId?: number;
  zone?: string;
  baseDistance?: number;
  pricePerKM?: number;
  fixPrice?: number;
}): Promise<void> {
  try {
    //check if organization and item not exist throws error

    const [organization, item] = await Promise.allSettled([
      organizationId && findOrganizationById(organizationId),
      itemId && findItemById(itemId),
    ]);

    if (organization.status === "rejected") throw organization.reason;
    if (item.status === "rejected") throw item.reason;

    await prisma.pricing.update({
      where: {
        id,
      },
      data: {
        organizationId,
        itemId,
        baseDistance,
        pricePerKM,
        zone,
        fixPrice,
      },
    });
  } catch (error) {
    throw error;
  }
}
