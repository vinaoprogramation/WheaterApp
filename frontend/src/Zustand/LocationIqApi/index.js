import { create } from 'zustand';

import BASE_URL from '../UrlBase';

import api from '../Api';

const LocationIqApi = create((set) => ({

  cidade: null,

  pegaCidade: async (latitude, longitude) => {
    try {
      const response = await api.get(`${BASE_URL}/revgeocoding/${latitude}/${longitude}`);

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`);
      }
      const answer = await response.json();
      console.log('Resposta da API de geocodificação reversa:', answer);
      set({ cidade: answer.Cidade });

    } catch (err) {
      console.warn('Erro ao buscar cidade:', err);
    }
  },
}
)
)

export default LocationIqApi