import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Title, Card } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Product } from "../models/Product"; // Importe a interface Product
import { v4 as uuidv4 } from "uuid"; // Use a biblioteca uuid para gerar ids únicos

type ProductEditScreenRouteProp = RouteProp<RootStackParamList, "ProductEdit">;
type ProductEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductEdit"
>;

const ProductEditScreen = () => {
  const navigation = useNavigation<ProductEditScreenNavigationProp>();
  const route = useRoute<ProductEditScreenRouteProp>();
  const { product } = route.params || {}; // Verifica se product é passado nos parâmetros

  // Estado para os campos do produto
  const [code, setCode] = useState<string>(product?.code || "");
  const [name, setName] = useState<string>(product?.name || "");
  const [quantity, setQuantity] = useState<number>(product?.quantity || 0);
  const [cost, setCost] = useState<number>(product?.cost || 0);
  const [price, setPrice] = useState<number>(product?.price || 0);

  const handleSave = () => {
    if (!code || !name || !quantity || !cost || !price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const newProduct: Product = {
      id: product ? product.id : uuidv4(), // Se for um novo produto, gera um id único
      code,
      name,
      quantity,
      cost,
      price,
    };

    if (product) {
      // Lógica para editar o produto
      console.log("Editando produto", newProduct);
    } else {
      // Lógica para adicionar um novo produto
      console.log("Adicionando novo produto", newProduct);
    }

    // Após salvar, pode navegar de volta ou limpar os campos
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{product ? "Editar Produto" : "Adicionar Produto"}</Title>
          <TextInput
            label="Código do Produto"
            value={code}
            onChangeText={setCode}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Nome do Produto"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Quantidade"
            value={String(quantity)} // Convertendo para string para input de texto
            onChangeText={(text) => setQuantity(Number(text))}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Custo de Compra"
            value={String(cost)} // Convertendo para string para input de texto
            onChangeText={(text) => setCost(Number(text))}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Preço Unitário"
            value={String(price)} // Convertendo para string para input de texto
            onChangeText={(text) => setPrice(Number(text))}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleSave} style={styles.button}>
            Salvar
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

export default ProductEditScreen;
