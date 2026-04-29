import { Platform } from 'react-native';

// ⚠️ Cambiá esta IP por la IP de la laptop donde corre el backend
const BACKEND_IP = '13.222.142.14'; 

export const API_URL = Platform.OS === 'web' 
  ? 'http://localhost:8000/api'        // Para navegador web
  : `http://${BACKEND_IP}:8000/api`;   // Para Expo Go en celular