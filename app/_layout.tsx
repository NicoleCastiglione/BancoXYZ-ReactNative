//es lo que envuelve toda nuestra app. Aca ponemos lo que queremos que se muestre siempre, ejemplo un footer
// para autenticacion uso AuthContext.

import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./login";
import { Stack } from "expo-router";
import { useContext } from "react";
import HomeScreen from "./home";
import TransfersScreen from "./transfers/transfers";
import ErrorScreen from "./transfers/components/errorTransfer";
import SuccessScreen from "./transfers/components/successTransfer";
import TransferListScreen from "./transfers/components/transfersList";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/authContext";

export default function App() {
  // const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación

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

// <View style={styles.container}>
{
  /* <LoginScreen/> */
}
// {/* <HomeScreen /> */}
{
  /* <TransfersScreen /> */
}
{
  /* <ErrorScreen /> */
}
{
  /* <SuccessScreen /> */
}
{
  /* <TransferListScreen /> */
}
{
  /* </View> */
}
