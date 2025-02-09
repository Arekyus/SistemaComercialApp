import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Title, List } from "react-native-paper";
import { db } from "../database/db";
import { Sale } from "../models/Sale"; // Importe a interface Sale

const SalesReportScreen = () => {
  const [sales, setSales] = useState<Sale[]>([]); // Defina o tipo do estado

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sales",
        [],
        (_, { rows }) => setSales(rows.raw()), // Use rows.raw()
        (_, error) => console.error("Error fetching sales", error)
      );
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Pedido #{item.id}</Title>
              <List.Item title={`Data: ${item.date}`} />
              <List.Item title={`Forma de Pagamento: ${item.paymentMethod}`} />
              <List.Item title={`Total: R$ ${item.totalAmount}`} />
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
  },
});

export default SalesReportScreen;
