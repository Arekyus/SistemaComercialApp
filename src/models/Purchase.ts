import { Product } from "./Product";

export interface Purchase {
  id: number;
  purchaseNumber: string;
  supplierName: string;
  date: string;
  products: Array<{
    product: Product;
    quantity: number;
    cost: number;
  }>;
  totalAmount: number;
}