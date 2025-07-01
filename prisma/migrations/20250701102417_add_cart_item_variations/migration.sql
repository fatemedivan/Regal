-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productColorId" TEXT,
    "productSizeId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItem_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "ProductColor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CartItem_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("cartId", "createdAt", "id", "productId", "quantity", "updatedAt") SELECT "cartId", "createdAt", "id", "productId", "quantity", "updatedAt" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE UNIQUE INDEX "CartItem_cartId_productId_productColorId_productSizeId_key" ON "CartItem"("cartId", "productId", "productColorId", "productSizeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
