-- CreateTable
CREATE TABLE "Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Unknown', -- Add this line
    "picture" TEXT, -- Add this line
    CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- If the table already exists and you need to alter it, use the following SQL statements:
-- ALTER TABLE "Property" ADD COLUMN "location" TEXT NOT NULL DEFAULT 'Unknown';
-- ALTER TABLE "Property" ADD COLUMN "picture" TEXT;