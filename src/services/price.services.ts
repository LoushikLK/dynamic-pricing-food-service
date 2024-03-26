import { ItemType } from "@prisma/client";

export async function checkPrice({
  zone,
  organizationId,
  totalDistance,
  itemType,
}: {
  zone: string;
  organizationId: string;
  totalDistance: string;
  itemType: ItemType;
}) {
  try {
    return {};
  } catch (error) {
    throw error;
  }
}
