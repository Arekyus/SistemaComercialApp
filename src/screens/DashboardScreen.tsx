import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Importe o tipo das rotas
import { StackNavigationProp } from "@react-navigation/stack"; // Importe o tipo de navegação

// Defina o tipo de navegação para a tela Dashboard
type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen = () => {
  // Use o tipo de navegação corretamente
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Dashboard</Title>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("ProductList")}
            style={styles.button}
          >
            Produtos
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Sales")}
            style={styles.button}
          >
            Vendas
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Purchase")}
            style={styles.button}
          >
            Compras
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("SalesReport")}
            style={styles.button}
          >
            Relatório de Caixa
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default DashboardScreen;
