import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Hubo un error en la transferencia</Text>
      <Button
        title="Intentar de nuevo"
        onPress={() => router.push("/transfers/transfers")}
      />
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
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
