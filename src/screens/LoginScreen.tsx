import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Importe o tipo das rotas
import { StackNavigationProp } from "@react-navigation/stack"; // Importe o tipo de navegação

// Defina o tipo de navegação para a tela Login
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Lógica de autenticação (pode ser integrada com um backend ou banco de dados)
    if (username && password) {
      navigation.navigate("Dashboard"); // Navegue para a tela Dashboard
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Title style={styles.title}>Sistema Comercial</Title>
      <TextInput
        label="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
