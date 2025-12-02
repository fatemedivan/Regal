import { Category } from "@prisma/client";

export type CategoryWithSub = Category & {
  subcategories: {
    id: string;
    name: string;
    parentId: string | null;
  }[];
};
