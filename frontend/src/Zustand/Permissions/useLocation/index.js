import * as Location from 'expo-location';

import { create } from 'zustand';


const useLocation = create((set) => ({
  pedirPermissaoLocalizacao: async () => {

    const { status: statusLocalizacao } = await Location.requestForegroundPermissionsAsync();
    if (statusLocalizacao !== 'granted') {
      console.log('Permissão de localização negada.');
      return false;
    }

    return true;
  }
}
)
)

export default useLocation;