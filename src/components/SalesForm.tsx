import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface SalesFormProps {
  onSubmit: (data: {
    customerName: string;
    customerPhone: string;
    products: Array<{ id: number; quantity: number; price: number }>;
    paymentMethod: string;
  }) => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dinheiro");
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ id: number; quantity: number; price: number }>
  >([]);

  const handleAddProduct = () => {};

  const handleSubmit = () => {
    if (!customerName || !customerPhone || selectedProducts.length === 0) {
      alert("Por favor, preencha todos os campos e adicione produtos.");
      return;
    }
    onSubmit({
      customerName,
      customerPhone,
      products: selectedProducts,
      paymentMethod,
    });
  };

  return (
    <View style={styles.container}>
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
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Adicionar Produto
      </Button>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Finalizar Venda
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default SalesForm;
