import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Title, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { db } from "../database/db";
import { Product } from "../models/Product";

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation<ProductListScreenNavigationProp>();

  const fetchProducts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM products",
        [],
        (_, { rows }) => {
          console.log("Products fetched:", rows.raw());
          setProducts(rows.raw());
        },
        (_, error) => console.error("Error fetching products:", error)
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM products WHERE id = ?",
        [id],
        () => {
          console.log("Product deleted:", id);
          fetchProducts();
        },
        (_, error) => console.error("Error deleting product:", error)
      );
    });
  };

  return (
    <View style={styles.container}>
      {}
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
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#F44336",
  },
});

export default ProductListScreen;
