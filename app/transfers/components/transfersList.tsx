import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

interface Transfer {
  id: string;
  recipient: string;
  amount: string;
  date: string;
}

const transferData: Transfer[] = [
  { id: "1", recipient: "Juan Perez", amount: "5000", date: "2024-08-01" },
  { id: "2", recipient: "Maria Lopez", amount: "2000", date: "2024-08-15" },
  { id: "3", recipient: "Carlos Martinez", amount: "3000", date: "2024-09-01" },
  { id: "4", recipient: "Juan Lopez", amount: "3000", date: "2024-10-01" },
  { id: "5", recipient: "Juan Benitez", amount: "1500", date: "2024-10-01" },
  // Agrega más transferencias según sea necesar
];

export default function TransferList() {
  const [filteredData, setFilteredData] = useState(transferData);
  const [recipientFilter, setRecipientFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    let filtered = transferData;

    if (recipientFilter) {
      filtered = filtered.filter((item) =>
        item.recipient.toLowerCase().includes(recipientFilter.toLowerCase())
      );
    }

    if (amountFilter) {
      filtered = filtered.filter((item) => item.amount.includes(amountFilter));
    }

    if (dateFilter) {
      filtered = filtered.filter((item) => item.date.includes(dateFilter));
    }

    setFilteredData(filtered);
  }, [recipientFilter, amountFilter, dateFilter]);

  return (
    <View style={styles.container}>
      {/* <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable> */}
      <View>
        <Text style={styles.title}>Historial de Transferencias</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Filtrar por destinatario"
        value={recipientFilter}
        onChangeText={setRecipientFilter}
      />

      <TextInput
        style={styles.search}
        placeholder="Filtrar por monto"
        keyboardType="numeric"
        value={amountFilter}
        onChangeText={setAmountFilter}
      />

      <TextInput
        style={styles.search}
        placeholder="Filtrar por fecha (YYYY-MM-DD)"
        value={dateFilter}
        onChangeText={setDateFilter}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.recipient}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  search: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 1,
  },
});
