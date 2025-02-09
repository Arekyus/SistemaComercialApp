import { Product } from "../models/Product"; // Importe a interface Product

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ProductList: undefined;
  ProductEdit: { product?: Product }; // Use a interface Product
  Sales: undefined;
  SalesReport: undefined;
  Purchase: undefined;
};