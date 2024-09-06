import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/authContext";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Stack>
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="home" options={{ title: "Home" }} />
          <Stack.Screen
            name="transfers/transfers"
            options={{ title: "Transfers" }}
          />
          <Stack.Screen
            name="transfers/components/successTransfer"
            options={{ headerTitle: "Success" }}
          />
          <Stack.Screen
            name="transfers/components/errorTransfer"
            options={{ headerTitle: "Error" }}
          />
          <Stack.Screen
            name="transfers/components/transfersList"
            options={{ headerTitle: "TransfersList" }}
          />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
