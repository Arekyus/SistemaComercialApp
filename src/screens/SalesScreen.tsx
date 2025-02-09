import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Title, Card } from "react-native-paper";

const SalesScreen = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProduct = () => {
    // Lógica para adicionar produtos ao pedido
  };

  const handleFinalizeSale = () => {
    // Lógica para finalizar a venda
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
            onPress={handleAddProduct}
            style={styles.button}
          >
            Adicionar Produto
          </Button>
          <Button
            mode="contained"
            onPress={handleFinalizeSale}
            style={styles.button}
          >
            Finalizar Venda
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
