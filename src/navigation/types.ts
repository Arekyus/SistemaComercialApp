import { Product } from "../models/Product"; 

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ProductList: undefined;
  ProductEdit: { product?: Product };
  Sales: undefined;
  SalesReport: undefined;
  Purchase: undefined;
};