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
    const token = await AsyncStorage.getItem('token'); 
 
    if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});


