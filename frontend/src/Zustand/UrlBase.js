import { Platform } from 'react-native';


const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'localhost:3000';


  export default BASE_URL;