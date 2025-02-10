import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Title, Card } from "react-native-paper";
import { Product } from "../models/Product";
import { db } from "../database/db";

const SalesScreen = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    if (!product || !product.id || product.quantity <= 0) {
      alert("Selecione um produto e insira uma quantidade válida.");
      return;
    }

    setSelectedProducts([...selectedProducts, product]);
  };

  const handleFinalizeSale = (
    customerName: string,
    customerPhone: string,
    selectedProducts: Product[],
    setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    resetForm: () => void
  ) => {
    if (!customerName || !customerPhone || selectedProducts.length === 0) {
      alert("Preencha todos os campos e adicione produtos.");
      return;
    }

    const date = new Date().toISOString();
    const totalAmount = selectedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sales (customerName, customerPhone, totalAmount, date, paymentMethod) VALUES (?, ?, ?, ?, ?)",
        [customerName, customerPhone, totalAmount, date, "dinheiro"],
        (_, result) => {
          selectedProducts.forEach(({ id, quantity }) => {
            tx.executeSql(
              "UPDATE products SET quantity = quantity - ? WHERE id = ?",
              [quantity, id]
            );
          });

          alert("Venda registrada com sucesso!");
          resetForm();
        },
        (_, error) => console.error("Erro ao registrar venda:", error)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Registrar Venda</Title>
          <TextInput
            label="Nome do Comprador"
            value={customerName}
            onChangeText={setCustomerName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Telefone"
            value={customerPhone}
            onChangeText={setCustomerPhone}
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={() => selectedProduct && handleAddProduct(selectedProduct)}
            style={styles.button}
          >
            Adicionar Produto
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
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default SalesScreen;
