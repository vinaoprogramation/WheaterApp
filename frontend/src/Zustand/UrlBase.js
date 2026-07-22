import { Platform } from 'react-native';


const BASE_URL = Platform.OS === 'android'
  ? 'http://192.168.1.11:3000'
  : 'http://localhost:3000';


  export default BASE_URL;