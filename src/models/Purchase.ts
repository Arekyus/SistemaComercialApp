import { Product } from "./Product"; // Importe a interface Product

export interface Purchase {
  id: number; // Identificador único da compra
  purchaseNumber: string; // Número da compra (ex: "COMP-001")
  supplierName: string; // Nome do fornecedor
  date: string; // Data da compra (ex: "2023-10-01")
  products: Array<{
    product: Product; // Produto comprado
    quantity: number; // Quantidade comprada
    cost: number; // Custo unitário do produto na compra
  }>;
  totalAmount: number; // Valor total da compra
}