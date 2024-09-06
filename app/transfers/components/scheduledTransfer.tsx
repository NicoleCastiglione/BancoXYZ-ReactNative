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

export default function ScheduledTransferScreen() {
  const [scheduledAmount, setScheduledAmount] = useState("");
  const [scheduledRecipient, setScheduledRecipient] = useState("");
  const [transferDate, setTransferDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  const handleScheduledTransfer = () => {
    if (scheduledAmount && scheduledRecipient) {
      Alert.alert(
        "Transferencia programada",
        `Monto: $${scheduledAmount}\nDestinatario: ${scheduledRecipient}\nDía: ${transferDate.toLocaleDateString()}`
      );
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
      <Pressable style={styles.button2} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Seleccionar Fecha</Text>
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
      <Pressable style={styles.buttonHome} onPress={() => router.push("/home")}>
        <Text style={styles.buttonText}>Volver al Home</Text>
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
  dateButtonText: {
    color: "#0666cc",
    fontSize: 18,
    fontWeight: "bold",
  },
  datePicker: {
    width: "100%",
    marginVertical: 15,
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#3b3b3b",
  },
  button: {
    backgroundColor: "#0666cc",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: "auto",
  },
  buttonHome: {
    backgroundColor: "#3f7fc4",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  button2: {
    backgroundColor: "#5395db",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
