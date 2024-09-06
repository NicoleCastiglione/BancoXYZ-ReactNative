import { getTransfers } from "@/auth/transferList";
import { TransferListResponse } from "@/services/transferList.responses";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function TransferList() {
  const [transfers, setTransfers] = useState<TransferListResponse[]>([]);
  const [filteredData, setFilteredData] = useState<TransferListResponse[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await getTransfers();
        setTransfers(response.transfers);
        setFilteredData(response.transfers);
      } catch (error) {
        setError("Error al obtener la lista de transferencias.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  useEffect(() => {
    const filtered = transfers.filter(
      (item) =>
        item.payeer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.value.toString().includes(searchFilter) ||
        item.date.includes(searchFilter)
    );

    setFilteredData(filtered);
  }, [searchFilter, transfers]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar por destinatario, monto o fecha"
        value={searchFilter}
        onChangeText={setSearchFilter}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.payeer.name}</Text>
            <Text>{item.value.toFixed(2)}</Text>
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
