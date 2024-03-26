import { ItemType, Prisma } from "@prisma/client";
import { BadRequest } from "http-errors";
import { prisma } from "../config";

/**
 * Creates a new item with the specified type and description.
 *
 * @param {Object} params - The parameters for creating the item.
 * @param {ItemType} params.type - The type of the item.
 * @param {string} [params.description] - The description of the item (optional).
 * @return {Promise<void>} - A promise that resolves when the item is created successfully.
 * @throws {BadRequest} - If the item already exists.
 */
export async function createItem({
  type,
  description,
}: {
  type: ItemType;
  description?: string;
}): Promise<void> {
  try {
    //check if item already exist

    const item = await findItemByType({ type });
    if (item) throw new BadRequest("Item already exist!");

    await prisma.item.create({
      data: {
        type,
        description,
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Finds an item by its type.
 *
 * @param {Object} params - The parameters for finding the item.
 * @param {ItemType} params.type - The type of the item.
 * @return {Promise<Object>} The item object with its associated pricing information.
 * @throws {BadRequest} If the item is not found.
 */
export async function findItemByType({
  type,
}: {
  type: ItemType;
}): Promise<object> {
  try {
    const item = await prisma.item.findUnique({
      where: {
        type,
      },
      include: {
        Pricing: {
          select: {
            zone: true,
            pricePerKM: true,
            baseDistanceInKM: true,
            fixPrice: true,
            organization: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!item) throw new BadRequest("Item not found!");

    return item;
  } catch (error) {
    throw error;
  }
}

/**
 * Finds an item by its ID and includes its pricing information.
 *
 * @param {number} id - The ID of the item to find.
 * @return {Promise<object>} A promise that resolves to the item object with its pricing information.
 * @throws {BadRequest} If the item is not found.
 */
export async function findItemById(id: number): Promise<object> {
  try {
    const item = await prisma.item.findUnique({
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
            organization: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!item) throw new BadRequest("Item not found!");

    return item;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves a list of items based on the specified criteria.
 *
 * @param {Object} options - The options for retrieving items.
 * @param {number} options.perPage - The number of items to retrieve per page. Default is 10.
 * @param {number} options.pageNo - The page number of the items to retrieve. Default is 1.
 * @param {ItemType} options.type - The type term to filter items by name.
 * @param {string} options.sortBy - The field to sort the items by.
 * @return {Promise<Object>} An object containing the list of items and the total count.
 */
export async function getItems({
  pageNo = 1,
  perPage = 10,
  type,
  sortBy,
}: {
  perPage?: number;
  pageNo?: number;
  type?: ItemType;
  sortBy?: string;
}): Promise<{ data: object; total: number }> {
  try {
    let where: Prisma.ItemWhereInput = {};
    let orderBy: Prisma.Enumerable<Prisma.ItemOrderByWithRelationInput> = {
      createdAt: "desc",
    };

    if (type) {
      where["type"] = type;
    }

    if (sortBy?.includes("createdAt")) {
      orderBy["createdAt"] = sortBy?.includes("asc") ? "asc" : "desc";
    }

    const [items, total] = await Promise.all([
      prisma.item.findMany({
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
              organization: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      await prisma.item.count({
        where,
      }),
    ]);

    return { data: items, total };
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes an item with the specified ID.
 *
 * @param {number} id - The ID of the item to delete.
 * @return {Promise<void>} - A promise that resolves when the item is deleted.
 */
export async function deleteItem({ id }: { id: number }): Promise<void> {
  try {
    await prisma.item.delete({
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
 * Update an item by its id with the provided type and description.
 *
 * @param {Object} options
 * @param {number} options.id - The id of the item to update.
 * @param {ItemType} options.type - The new type of the item.
 * @param {string} [options.description] - Optional description for the item.
 * @return {Promise<void>} Promise that resolves when the item is successfully updated.
 */
export async function updateItem({
  id,
  type,
  description,
}: {
  id: number;
  type: ItemType;
  description?: string;
}): Promise<void> {
  try {
    //check if item with the current type already exist
    const item = await findItemByType({ type });

    if (item) throw new BadRequest("Item already exist!");

    await prisma.item.update({
      where: {
        id,
      },
      data: {
        type,
        description,
      },
    });
  } catch (error) {
    throw error;
  }
}
