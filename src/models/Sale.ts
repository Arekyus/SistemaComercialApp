export interface Sale {
  id: number; // Identificador único da venda
  customerName: string; // Nome do cliente
  customerPhone: string; // Telefone do cliente
  date: string; // Data da venda (ex: "2023-10-01")
  totalAmount: number; // Valor total da venda
  paymentMethod: "dinheiro" | "cartão" | "pix"; // Método de pagamento
}