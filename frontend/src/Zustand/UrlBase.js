import { Platform } from 'react-native';


const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3002'
  : 'localhost:3002';


  export default BASE_URL;