import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta y añade el token JWT si está disponible
api.interceptors.request.use( async (config: any) => {
   //1. Obtengo el token del storage.
    const token = await AsyncStorage.getItem('token');  // O maneja el token en AsyncStorage si estás en React Native
  //2. Si existe el token, le coloca un header a la petición HTTP.
  //la key va a ser 'x-token' y el value va a ser el token obtenido del storage
    if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


