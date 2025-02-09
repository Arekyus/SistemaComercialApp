import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface ProductFormProps {
  initialData?: {
    code: string;
    name: string;
    quantity: string;
    cost: string;
    price: string;
  };
  onSubmit: (data: {
    code: string;
    name: string;
    quantity: string;
    cost: string;
    price: string;
  }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const [code, setCode] = useState(initialData?.code || "");
  const [name, setName] = useState(initialData?.name || "");
  const [quantity, setQuantity] = useState(initialData?.quantity || "");
  const [cost, setCost] = useState(initialData?.cost || "");
  const [price, setPrice] = useState(initialData?.price || "");

  const handleSubmit = () => {
    if (!code || !name || !quantity || !cost || !price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    onSubmit({ code, name, quantity, cost, price });
  };

  return (
    <View style={styles.container}>
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
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Custo de Compra"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Preço Unitário"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Salvar
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

export default ProductForm;
