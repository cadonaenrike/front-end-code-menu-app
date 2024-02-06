export interface Product {
  id?: string;
  name: string;
  description?: string;
  qty: number;
  price: number;
  photo?: string;
  category_id?: string | null;
}
export interface Category {
  id: string;
  parent: Category[] | null;
  name: string;
}
