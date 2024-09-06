import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/authContext";

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen
            name="transfers/transfers"
            options={{
              title: "Transferencia Bancaria",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="transfers/components/transfersList"
            options={{
              title: "Historial de Transferencias",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="transfers/components/scheduledTransfer"
            options={{
              title: "Programar Transferencia",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
