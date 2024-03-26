import { Prisma } from "@prisma/client";
import { BadRequest } from "http-errors";
import { prisma } from "../config";

/**
 * Function to create a new organization if it does not already exist.
 *
 * @param {string} name - The name of the organization to create.
 * @return {Promise<void>} Promise that resolves when the organization is successfully created.
 */
export async function createOrganization({
  name,
}: {
  name: string;
}): Promise<void> {
  try {
    //check if organization already exist

    const organization = await findOrganizationByName({ name });
    if (organization) throw new BadRequest("Organization already exist!");

    await prisma.organization.create({
      data: {
        name,
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Finds an organization by its name.
 *
 * @param {Object} params - The parameters for finding the organization.
 * @param {string} params.name - The name of the organization.
 * @return {Promise<Object>} The organization object with its associated pricing information.
 * @throws {BadRequest} If the organization is not found.
 */
export async function findOrganizationByName({
  name,
}: {
  name: string;
}): Promise<object> {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        name,
      },
      include: {
        Pricing: {
          select: {
            zone: true,
            pricePerKM: true,
            baseDistanceInKM: true,
            fixPrice: true,
            item: {
              select: {
                type: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!organization) throw new BadRequest("Organization not found!");

    return organization;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds an organization by its ID and includes its pricing information.
 *
 * @param {number} id - The ID of the organization to find.
 * @return {Promise<object>} A promise that resolves to the organization object with its pricing information.
 * @throws {BadRequest} If the organization is not found.
 */
export async function findOrganizationById(id: number): Promise<object> {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        Pricing: {
          select: {
            zone: true,
            pricePerKM: true,
            baseDistanceInKM: true,
            fixPrice: true,
            item: {
              select: {
                type: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!organization) throw new BadRequest("Organization not found!");

    return organization;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a list of organizations based on the specified criteria.
 *
 * @param {Object} options - The options for retrieving organizations.
 * @param {number} options.perPage - The number of organizations to retrieve per page. Default is 10.
 * @param {number} options.pageNo - The page number of the organizations to retrieve. Default is 1.
 * @param {string} options.search - The search term to filter organizations by name.
 * @param {string} options.sortBy - The field to sort the organizations by.
 * @return {Promise<Object>} An object containing the list of organizations and the total count.
 */
export async function getOrganizations({
  pageNo = 1,
  perPage = 10,
  search,
  sortBy,
}: {
  perPage?: number;
  pageNo?: number;
  search?: string;
  sortBy?: string;
}): Promise<{ data: object; total: number }> {
  try {
    let where: Prisma.OrganizationWhereInput = {};
    let orderBy: Prisma.Enumerable<Prisma.OrganizationOrderByWithRelationInput> =
      {
        createdAt: "desc",
      };

    if (search) {
      where["name"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (sortBy) {
      if (sortBy?.includes("name")) {
        orderBy["name"] = sortBy?.includes("name:asc") ? "asc" : "desc";
      }
    }

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        skip: (pageNo - 1) * perPage,
        take: perPage,
        orderBy,
        where,
        include: {
          Pricing: {
            select: {
              zone: true,
              pricePerKM: true,
              baseDistanceInKM: true,
              fixPrice: true,
              item: {
                select: {
                  type: true,
                  description: true,
                },
              },
            },
          },
        },
      }),
      await prisma.organization.count({
        where,
      }),
    ]);

    return { data: organizations, total };
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes an organization with the specified ID.
 *
 * @param {number} id - The ID of the organization to delete.
 * @return {Promise<void>} - A promise that resolves when the organization is deleted.
 */
export async function deleteOrganization({
  id,
}: {
  id: number;
}): Promise<void> {
  try {
    await prisma.organization.delete({
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
 * Updates the organization with the given id to the new name.
 *
 * @param {number} id - The id of the organization to be updated
 * @param {string} name - The new name for the organization
 * @return {Promise<void>} A Promise that resolves when the organization is successfully updated
 */
export async function updateOrganization({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<void> {
  try {
    //check if organization with the current name already exist
    const organization = await findOrganizationByName({ name });

    if (organization) throw new BadRequest("Organization already exist!");

    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    throw error;
  }
}
