import React, { useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
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

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);

  const [productId, setProductId] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCost, setProductCost] = useState("");

  const handleAddProduct = () => {
    setIsProductModalVisible(true);
  };

  const handleAddProductToList = () => {
    if (!productId || !productQuantity || !productCost) {
      alert("Por favor, preencha todos os campos do produto.");
      return;
    }

    const newProduct = {
      id: parseInt(productId, 10),
      quantity: parseInt(productQuantity, 10),
      cost: parseFloat(productCost),
    };

    setSelectedProducts([...selectedProducts, newProduct]);

    setProductId("");
    setProductQuantity("");
    setProductCost("");

    setIsProductModalVisible(false);
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
      {/* Campos do formulário de compra */}
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

      {/* Botão para adicionar produto */}
      <Button mode="contained" onPress={handleAddProduct} style={styles.button}>
        Adicionar Produto
      </Button>

      {/* Modal para adicionar produto */}
      <Modal
        visible={isProductModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsProductModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Produto</Text>

            <TextInput
              label="ID do Produto"
              value={productId}
              onChangeText={setProductId}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Quantidade"
              value={productQuantity}
              onChangeText={setProductQuantity}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Custo Unitário"
              value={productCost}
              onChangeText={setProductCost}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={handleAddProductToList}
              style={styles.button}
            >
              Adicionar
            </Button>
            <Button
              mode="outlined"
              onPress={() => setIsProductModalVisible(false)}
              style={styles.button}
            >
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>

      {/* Botão para finalizar a compra */}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PurchaseForm;
