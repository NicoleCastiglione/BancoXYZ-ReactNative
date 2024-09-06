import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/";

export const apiBalance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiBalance.interceptors.request.use( async (config: any) => {
    const token = await AsyncStorage.getItem('token'); 
 
    if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
