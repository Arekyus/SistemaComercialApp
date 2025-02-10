export interface Sale {
  id: number; 
  customerName: string;
  customerPhone: string;
  date: string;
  totalAmount: number;
  paymentMethod: "dinheiro" | "cartão" | "pix";
}