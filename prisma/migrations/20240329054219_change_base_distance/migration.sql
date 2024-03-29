-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
