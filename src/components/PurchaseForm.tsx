import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface PurchaseFormProps {
  onSubmit: (data: {
    supplierName: string;
    purchaseNumber: string;
    products: Array<{ id: number; quantity: number; cost: number }>;
  }) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit }) => {
  const [supplierName, setSupplierName] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ id: number; quantity: number; cost: number }>
  >([]);

  const handleAddProduct = () => {
    // Lógica para adicionar produtos à compra
    // Exemplo: abrir um modal para selecionar produtos
  };

  const handleSubmit = () => {
    if (!supplierName || !purchaseNumber || selectedProducts.length === 0) {
      alert("Por favor, preencha todos os campos e adicione produtos.");
      return;
    }
    onSubmit({ supplierName, purchaseNumber, products: selectedProducts });
  };

  return (
    <View style={styles.container}>
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
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Adicionar Produto
      </Button>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Finalizar Compra
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

export default PurchaseForm;
