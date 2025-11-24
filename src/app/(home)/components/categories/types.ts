export interface Subcategory {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  subcategories: Subcategory[];
}
