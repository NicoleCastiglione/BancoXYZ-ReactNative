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

import AsyncStorage from "@react-native-async-storage/async-storage";

const BALANCE_ENDPOINT =
  "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance";

const Balance = ({ amount }: { amount: number }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balanceAmount}>${amount.toFixed(2)}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const router = useRouter();
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(BALANCE_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setUserBalance(json.accountBalance);
        } else {
          setError("No autorizado o error en la solicitud.");
        }
      } catch (error) {
        setError("Error al obtener el saldo.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getName = async () => {
      try {
        const nameObtained = await AsyncStorage.getItem("userName");
        if (nameObtained) {
          setName(nameObtained);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    getName();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estas seguro de que deseas cerrar sesión?", [
      {
        text: "Sí",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          router.push("/login");
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Welcome!</Text>
        {userBalance !== null ? <Balance amount={userBalance} /> : null}
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("./transfers/transfers")}
        >
          <Text style={styles.actionButtonText}>Transferir</Text>
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
    padding: 20,
    backgroundColor: "#f0f4f8",
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
    backgroundColor: "#4B6EF5",
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
    marginBottom: 20,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
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
