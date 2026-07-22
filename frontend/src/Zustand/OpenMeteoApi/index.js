import { create } from 'zustand';

import BASE_URL from '../UrlBase';

const OpenMeteoApi = create((set) => ({

  temperatura: null,


  pegaTemperatura: async (latitude, longitude, hora) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${latitude}/${longitude}/${hora}`);

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`);
      }

      const answer = await response.json();
      set({ temperatura: answer.Temperatura });
    } catch (err) {
      console.warn('Erro ao buscar temperatura:', err);
      set({ temperatura: null });
    }
  },
}
)
)

export default OpenMeteoApi;