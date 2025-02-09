import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDatabase } from "./src/database/db"; // Importe a função initDatabase

const App = () => {
  useEffect(() => {
    initDatabase(); // Chame a função de inicialização do banco de dados
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
