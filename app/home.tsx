import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Este es un componente ficticio para mostrar el saldo. Puedes reemplazarlo con datos reales.
const Balance = ({ amount }: { amount: number }) => {
  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.balanceText}>
        Current Balance: ${amount.toFixed(2)}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  const router = useRouter();
  // Aquí puedes obtener el saldo del usuario desde el estado global o un hook.
  const userBalance = 1234.56; // Ejemplo de saldo

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Balance amount={userBalance} />
      <View>
        <Button
          title="Transferir"
          onPress={() => router.push("./transfers/transfers")}
        />
      </View>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={15} color="white" />
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  balanceContainer: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0666cc",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
