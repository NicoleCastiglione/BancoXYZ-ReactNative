//es lo que envuelve toda nuestra app. Aca ponemos lo que queremos que se muestre siempre, ejemplo un footer
// para autenticacion uso AuthContext. 

import { View, Text, StyleSheet} from 'react-native';
import LoginScreen from './login';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import HomeScreen from './home';
import TransfersScreen from './transfers';

export default function App(){

  // const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación
  
  return (
      <View style={styles.container}>
        {/* <LoginScreen/> */}
        {/* <HomeScreen/> */}
        <TransfersScreen/>
      </View>
    //   <Stack initialRouteName={isAuthenticated ? "home" : "login"}>
    //   <Stack.Screen name="home" options={{ title: 'Home' }} />
    // <Stack.Screen name="transfers" options={{ title: 'Transfers' }} />
    // </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});


