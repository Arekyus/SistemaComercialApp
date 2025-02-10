import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import {
  Button,
  TextInput,
  Title,
  Card,
  Dialog,
  Portal,
  List,
} from "react-native-paper";
import { db } from "../database/db";
import { Product } from "../models/Product";

const PurchaseScreen = () => {
  const [supplierName, setSupplierName] = useState("");
  const [purchaseNumber, setPurchaseNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM products",
        [],
        (_, { rows }) => {
          let productsArray: Product[] = [];
          for (let i = 0; i < rows.length; i++) {
            productsArray.push(rows.item(i));
          }
          setProductList(productsArray);
        },
        (_, error) => {
          console.error("Erro ao buscar produtos:", error);
          return false;
        }
      );
    });
  }, []);

  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0 || unitCost <= 0) {
      Alert.alert("Erro", "Selecione um produto e insira valores válidos.");
      return;
    }

    const productToAdd = {
      ...selectedProduct,
      quantity,
      cost: unitCost,
    };

    setSelectedProducts([...selectedProducts, productToAdd]);
    setSelectedProduct(null);
    setQuantity(1);
    setUnitCost(0);
  };

  const handleFinalizePurchase = () => {
    if (!supplierName || !purchaseNumber || selectedProducts.length === 0) {
      Alert.alert("Erro", "Preencha todos os campos e adicione produtos.");
      return;
    }

    const date = new Date().toISOString();

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO purchases (supplierName, purchaseNumber, date) VALUES (?, ?, ?)",
        [supplierName, purchaseNumber, date],
        (_, result) => {
          const purchaseId = result.insertId;

          selectedProducts.forEach(({ id, quantity, cost }) => {
            tx.executeSql(
              "UPDATE products SET quantity = quantity + ?, cost = ? WHERE id = ?",
              [quantity, cost, id],
              () => console.log("Estoque atualizado"),
              (_, error) => console.error("Erro ao atualizar estoque:", error)
            );
          });

          Alert.alert("Sucesso", "Compra registrada com sucesso!");
          setSupplierName("");
          setPurchaseNumber("");
          setSelectedProducts([]);
        },
        (_, error) => console.error("Erro ao registrar compra:", error)
      );
    });
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
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            Adicionar Produto
          </Button>

          {/* Exibindo os produtos selecionados */}
          <FlatList
            data={selectedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <Text>
                  {item.name} - {item.quantity} x R${item.cost.toFixed(2)} = R$
                  {(item.quantity * item.cost).toFixed(2)}
                </Text>
              </View>
            )}
          />

          <Button
            mode="contained"
            onPress={handleFinalizePurchase}
            style={styles.button}
          >
            Finalizar Compra
          </Button>
        </Card.Content>
      </Card>

      {/* Modal para selecionar o produto */}
      <Portal>
        <Dialog
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <Dialog.Title>Selecione um Produto</Dialog.Title>
          <Dialog.Content>
            {productList.length === 0 ? (
              <Text>Sem produtos cadastrados.</Text>
            ) : (
              <FlatList
                data={productList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={item.name}
                    description={`Preço: R$${item.price.toFixed(2)}`}
                    onPress={() => {
                      setSelectedProduct(item);
                      setModalVisible(false);
                    }}
                  />
                )}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  productItem: { marginVertical: 5 },
});

export default PurchaseScreen;
