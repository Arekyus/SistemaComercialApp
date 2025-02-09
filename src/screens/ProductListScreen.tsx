import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Title, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { db } from "../database/db";
import { Product } from "../models/Product"; // Importe a interface Product

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]); // Defina o tipo do estado
  const navigation = useNavigation<ProductListScreenNavigationProp>();

  // Função para buscar os produtos do banco de dados
  const fetchProducts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM products",
        [],
        (_, { rows }) => {
          console.log("Products fetched:", rows.raw()); // Exibe os produtos no console
          setProducts(rows.raw());
        },
        (_, error) => console.error("Error fetching products:", error)
      );
    });
  };

  // Busca os produtos quando a tela é carregada
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para excluir um produto
  const handleDelete = (id: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM products WHERE id = ?",
        [id],
        () => {
          console.log("Product deleted:", id);
          fetchProducts(); // Atualiza a lista de produtos após a exclusão
        },
        (_, error) => console.error("Error deleting product:", error)
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Botão para adicionar um novo produto */}
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ProductEdit", { product: undefined })
        }
        style={styles.button}
      >
        Adicionar Produto
      </Button>

      {/* Lista de produtos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id} // O ID já é uma string
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <List.Item title={`Código: ${item.code}`} />
              <List.Item title={`Quantidade: ${item.quantity}`} />
              <List.Item title={`Preço: R$ ${item.price.toFixed(2)}`} />
              {/* Botão para editar o produto */}
              <Button
                onPress={() =>
                  navigation.navigate("ProductEdit", { product: item })
                }
                style={styles.editButton}
              >
                Editar
              </Button>
              {/* Botão para excluir o produto */}
              <Button
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                Excluir
              </Button>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#2196F3", // Cor azul para o botão de editar
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#F44336", // Cor vermelha para o botão de excluir
  },
});

export default ProductListScreen;
