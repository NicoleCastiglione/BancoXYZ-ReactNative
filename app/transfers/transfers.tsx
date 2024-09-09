import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { postTransfer } from "../../services/transfer";

export default function TransfersScreen() {
  const [document, setDocument] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTransfer = async () => {
    if (!document || !amount) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);

      const transferData = {
        value: parseFloat(amount),
        currency: "USD",
        payeerDocument: document,
        transferDate: date.toISOString().slice(0, 10),
      };

      const response = await postTransfer(transferData);

      if (response?.status === "success") {
        setDocument("");
        setAmount("");
        setDate(new Date());
        router.push("./components/successTransfer");
      } else {
        router.push("./components/errorTransfer");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Ocurrió un error durante el proceso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.input}
          placeholder="Destinatario"
          placeholderTextColor="#999"
          value={document}
          onChangeText={setDocument}
        />
      </View>
      <Pressable style={styles.button} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Realizar Transferencia</Text>
      </Pressable>
      <Pressable
        style={styles.button2}
        onPress={() => router.push("./components/scheduledTransfer")}
      >
        <Text style={styles.buttonText}>Programar Transferencia</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b3b3b",
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  currencySymbol: {
    fontSize: 24,
    color: "#999",
  },
  input: {
    flex: 1,
    fontSize: 24,
    color: "#000",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#0666cc",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 40,
  },
  button2: {
    backgroundColor: "#5395db",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#3b3b3b",
  },
});
