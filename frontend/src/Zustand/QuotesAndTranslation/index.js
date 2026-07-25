import { create } from 'zustand';

import BASE_URL from '../UrlBase';

const QuotesAndTranslation = create((set) => ({

  frase: null,

  pegaFrase: async () => {
    try {
      const response = await fetch(`${BASE_URL}/quotes/translated`);

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`);
      }
      const answer = await response.json();
      console.log(answer)
      set({ frase: answer.Quote });

    } catch (err) {
      console.warn('Erro ao buscar frase:', err);
    }
  },
}
)
)

export default QuotesAndTranslation