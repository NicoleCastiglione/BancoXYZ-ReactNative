import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

export default function TransfersScreen() {
  const [scheduledAmount, setScheduledAmount] = useState("");
  const [scheduledRecipient, setScheduledRecipient] = useState("");
  const [transferDate, setTransferDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const handleScheduledTransfer = () => {
    if (scheduledAmount && scheduledRecipient) {
      Alert.alert(
        "Transfer Scheduled",
        `Amount: $${scheduledAmount}\nRecipient: ${scheduledRecipient}\nScheduled Date: ${transferDate.toLocaleDateString()}`
      );
      // Lógica para agendar la transferencia aquí
    } else {
      Alert.alert("Error", "Please fill out all fields");
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || transferDate;
    setShowDatePicker(false);
    setTransferDate(currentDate);
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
          value={scheduledAmount}
          onChangeText={setScheduledAmount}
        />
      </View>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.input}
          placeholder="Destinatario"
          placeholderTextColor="#999"
          value={scheduledRecipient}
          onChangeText={setScheduledRecipient}
        />
      </View>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Text style={styles.linkText}>Seleccionar Fecha</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={transferDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.selectedDate}>
        Fecha seleccionada: {transferDate.toLocaleDateString()}
      </Text>
      <Pressable style={styles.button} onPress={handleScheduledTransfer}>
        <Text style={styles.buttonText}>Agendar Transferencia</Text>
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkText: {
    color: "#0666cc",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#3b3b3b",
  },
});
