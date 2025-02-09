import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Title, Card } from "react-native-paper";

const PurchaseScreen = () => {
  const [supplierName, setSupplierName] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProduct = () => {
    // Lógica para adicionar produtos à compra
  };

  const handleFinalizePurchase = () => {
    // Lógica para finalizar a compra
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Registrar Compra</Title>
          <TextInput
            label="Nome do Fornecedor"
            value={supplierName}
            onChangeText={setSupplierName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Número da Compra"
            value={purchaseNumber}
            onChangeText={setPurchaseNumber}
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleAddProduct}
            style={styles.button}
          >
            Adicionar Produto
          </Button>
          <Button
            mode="contained"
            onPress={handleFinalizePurchase}
            style={styles.button}
          >
            Finalizar Compra
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

export default PurchaseScreen;
