import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Balance } from "@/services/balance.responses";
import { getBalance } from "@/auth/balance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BalanceComponent = ({ amount }: { amount: number }) => (
  <View style={styles.balanceCard}>
    <Text style={styles.balanceLabel}>Saldo Actual</Text>
    <Text style={styles.balanceAmount}>USD{amount}</Text>
  </View>
);

const HomeScreen = () => {
  const router = useRouter();
  const [userBalance, setUserBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceData = await getBalance();
        setUserBalance(balanceData);
      } catch (error) {
        setError("No autorizado o error en la solicitud.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estas seguro de que deseas cerrar sesión?", [
      {
        text: "Sí",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          router.push("/");
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Bienvenido a Banco YXZ</Text>
        {userBalance ? (
          <BalanceComponent amount={userBalance.accountBalance} />
        ) : null}
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("./transfers/transfers")}
        >
          <Text style={styles.actionButtonText}>Transferir</Text>
        </Pressable>
      </View>
      <View style={styles.actionButton2}>
        <Pressable
          onPress={() => router.push("./transfers/components/transfersList")}
        >
          <Text style={styles.actionButtonText}>Ver Historial</Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
    marginTop: 25,
  },
  topSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3b3b3b",
    marginBottom: 20,
    textAlign: "center",
  },
  balanceCard: {
    backgroundColor: "#5395db",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  balanceLabel: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0666cc",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  actionButton2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5395db",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: "auto",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HomeScreen;
