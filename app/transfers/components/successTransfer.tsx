import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>¡Transferencia realizada con éxito!</Text>
      <Button title="Volver a Home" onPress={() => router.push("/home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  message: {
    fontSize: 24,
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
});
