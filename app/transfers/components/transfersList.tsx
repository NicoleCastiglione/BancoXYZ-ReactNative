import { getTransfers } from "@/services/transferList";
import { TransferListResponse } from "@/interfaces/transferList.responses";
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
      <View>
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
            <View>
              <Text style={styles.nameText}>{item.payeer.name}</Text>
              <Text style={styles.valueText}>USD {item.value.toFixed(2)}</Text>
            </View>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 25,
    backgroundColor: "#f0f4f8",
  },
  search: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0666cc",
  },
  dateText: {
    fontSize: 16,
    textAlign: "right",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
