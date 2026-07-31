import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android'
  ? 'http://192.168.1.11:3002'
  : 'http://localhost:3002';

export default BASE_URL;