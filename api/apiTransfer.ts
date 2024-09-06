import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/';

export const apiTransfer = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta y añade el token JWT si está disponible
apiTransfer.interceptors.request.use( async (config: any) => {
    const token = await AsyncStorage.getItem('token'); 
 
    if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
