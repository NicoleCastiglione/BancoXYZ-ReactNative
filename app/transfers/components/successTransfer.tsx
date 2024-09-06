import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Transferencia realizada con éxito!</Text>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/transfers/transfers")}
        >
          <Text style={styles.buttonText}>Hacer otra transferencia</Text>
        </Pressable>
        <Pressable style={styles.button2} onPress={() => router.push("/home")}>
          <Text style={styles.buttonText}>Volver al Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  message: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0666cc",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  button2: {
    backgroundColor: "#5395db",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
