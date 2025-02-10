import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    const validUsername = "Empresa";
    const validPassword = "123456";

    if (username === validUsername && password === validPassword) {
      navigation.navigate("Dashboard");
    } else {
      alert("Usuário ou senha incorretos.");
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
