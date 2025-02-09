import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductEditScreen from "../screens/ProductEditScreen"; // Importe a tela
import SalesScreen from "../screens/SalesScreen";
import SalesReportScreen from "../screens/SalesReportScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import { RootStackParamList } from "./types"; // Importe o tipo das rotas

const Stack = createStackNavigator<RootStackParamList>(); // Use o tipo aqui

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductEdit" component={ProductEditScreen} />{" "}
    {/* Certifique-se de que a rota está registrada */}
    <Stack.Screen name="Sales" component={SalesScreen} />
    <Stack.Screen name="SalesReport" component={SalesReportScreen} />
    <Stack.Screen name="Purchase" component={PurchaseScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
