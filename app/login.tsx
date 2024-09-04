import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  const handleLogin = () => {
    // aca va la lógica de autenticación.
    if (email === 'test@example.com' && password === 'password') {
      Alert.alert('Inicio de sesión exitoso');
      router.push('/home') //tambien podria llamarlo index para que la ruta sea '/'
    } else {
      Alert.alert('Correo o contraseña incorrectos');
    }
  };

  //ver por que se inicia el teclado en mayuscula en la parte de email o cuando se ve la contraseña
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </Pressable>
      </View>
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default LoginScreen;