import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TransfersScreen() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [scheduledAmount, setScheduledAmount] = useState("");
  const [scheduledRecipient, setScheduledRecipient] = useState("");
  const [transferDate, setTransferDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleImmediateTransfer = () => {
    if (amount && recipient) {
      Alert.alert(
        "Transfer Successful",
        `Amount: $${amount}\nRecipient: ${recipient}}`
      );
      // Lógica para realizar la transferencia aquí
    } else {
      Alert.alert("Error", "Please fill out all fields");
    }
  };

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
      <Text style={styles.title}>Transferencias Bancarias</Text>

      {/* Sección de Transferencia Inmediata */}
      <Text style={styles.sectionTitle}>Transferencia Inmediata</Text>
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
          value={recipient}
          onChangeText={setRecipient}
        />
      </View>
      <Button
        title="Realizar Transferencia"
        onPress={handleImmediateTransfer}
      />

      {/* Sección de Programar Transferencia */}
      <Text style={styles.sectionTitle}>Programar Transferencia</Text>
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
      <Button
        title="Seleccionar Fecha"
        onPress={() => setShowDatePicker(true)}
      />
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
      <Button title="Agendar Transferencia" onPress={handleScheduledTransfer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: "left",
    fontWeight: "bold",
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
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
