import { create } from 'zustand';

import BASE_URL from '../UrlBase';

import api from '../Api';


const OpenMeteoApi = create((set) => ({
  condicoes: {
    data: null,
    temperatura: null,
    humidade: null,
    sensacaoTermica: null,
    condicaoClimatica: null,
    velocidadeVento: null,
    qualidadeArCo: null,
    qualidadeArNo2: null,
    indiceUv: null,
  },

  condicoesFuturas: [
    {
      data: null,
      temperaturaMax: null,
      temperaturaMin: null,
      temperaturaMedia: null,
      ventoMax: null,
      miliChuva: null,
      chanceChuva: null,
      indiceUv: null,
      condicaoClimatica: null,
      qualidadeArCo: null,
      qualidadeArNo2: null,
      nascerSol: null,
      porSol: null,
      nascerLua: null,
      faseLua: null,
    },



    {
      data: null,
      temperaturaMax: null,
      temperaturaMin: null,
      temperaturaMedia: null,
      ventoMax: null,
      miliChuva: null,
      chanceChuva: null,
      indiceUv: null,
      condicaoClimatica: null,
      qualidadeArCo: null,
      qualidadeArNo2: null,
      nascerSol: null,
      porSol: null,
      nascerLua: null,
      faseLua: null,
    },




    {
      data: null,
      temperaturaMax: null,
      temperaturaMin: null,
      temperaturaMedia: null,
      ventoMax: null,
      miliChuva: null,
      chanceChuva: null,
      indiceUv: null,
      condicaoClimatica: null,
      qualidadeArCo: null,
      qualidadeArNo2: null,
      nascerSol: null,
      porSol: null,
      nascerLua: null,
      faseLua: null,
    }

  ],





  pegaTemperatura: async (latitude, longitude) => {
    try {
      const response = await api.get(`${BASE_URL}/api/${latitude}/${longitude}`);

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`);
      }

      const answer = await response.json();
      set({
        condicoes: {
          data: answer.Data,
          temperatura: answer.Temperatura,
          humidade: answer.Humidade,
          sensacaoTermica: answer.SensacaoTermica,
          condicaoClimatica: answer.CondicaoClimatica,
          velocidadeVento: answer.VelocidadeVento,
          qualidadeArCo: answer.QualidadeArCo,
          qualidadeArNo2: answer.QualidadeArNo2,
          indiceUv: answer.IndiceUv,
        }
      });
    } catch (err) {
      console.warn('Erro ao buscar temperatura:', err);
      set({ temperatura: null });
    }
  },

  pegaCondicoes: async (latitude, longitude) => {
    try {
      const response = await api.get(`${BASE_URL}/api/${latitude}/${longitude}`);

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

  pegaPrevisao: async (latitude, longitude) => {
    try {
      const response = await api.get(`${BASE_URL}/forecast/${latitude}/${longitude}`);

      if (!response.ok) {
        throw new Error(`Falha na requisição: ${response.status}`);
      }

      const answer = await response.json();
      set({
        condicoesFuturas: [
           {
            data: answer.diaUm.data,
            temperaturaMax: answer.diaUm.temperaturaMax,
            temperaturaMin: answer.diaUm.temperaturaMin,
            temperaturaMedia: answer.diaUm.temperaturaMedia,
            ventoMax: answer.diaUm.ventoMax,
            miliChuva: answer.diaUm.miliChuva,
            chanceChuva: answer.diaUm.chanceChuva,
            indiceUv: answer.diaUm.indiceUv,
            condicaoClimatica: answer.diaUm.condicaoClimatica,
            qualidadeArCo: answer.diaUm.qualidadeArCo,
            qualidadeArNo2: answer.diaUm.qualidadeArNo2,
            nascerSol: answer.diaUm.nascerSol,
            porSol: answer.diaUm.porSol,
            nascerLua: answer.diaUm.nascerLua,
            faseLua: answer.diaUm.faseLua,
          },

           {
            data: answer.diaDois.data,
            temperaturaMax: answer.diaDois.temperaturaMax,
            temperaturaMin: answer.diaDois.temperaturaMin,
            temperaturaMedia: answer.diaDois.temperaturaMedia,
            ventoMax: answer.diaDois.ventoMax,
            miliChuva: answer.diaDois.miliChuva,
            chanceChuva: answer.diaDois.chanceChuva,
            indiceUv: answer.diaDois.indiceUv,
            condicaoClimatica: answer.diaDois.condicaoClimatica,
            qualidadeArCo: answer.diaDois.qualidadeArCo,
            qualidadeArNo2: answer.diaDois.qualidadeArNo2,
            nascerSol: answer.diaDois.nascerSol,
            porSol: answer.diaDois.porSol,
            nascerLua: answer.diaDois.nascerLua,
            faseLua: answer.diaDois.faseLua,
          },


           {
            data: answer.diaTres.data,
            temperaturaMax: answer.diaTres.temperaturaMax,
            temperaturaMin: answer.diaTres.temperaturaMin,
            temperaturaMedia: answer.diaTres.temperaturaMedia,
            ventoMax: answer.diaTres.ventoMax,
            miliChuva: answer.diaTres.miliChuva,
            chanceChuva: answer.diaTres.chanceChuva,
            indiceUv: answer.diaTres.indiceUv,
            condicaoClimatica: answer.diaTres.condicaoClimatica,
            qualidadeArCo: answer.diaTres.qualidadeArCo,
            qualidadeArNo2: answer.diaTres.qualidadeArNo2,
            nascerSol: answer.diaTres.nascerSol,
            porSol: answer.diaTres.porSol,
            nascerLua: answer.diaTres.nascerLua,
            faseLua: answer.diaTres.faseLua,
          }


        ]
    });

    } catch (err) {
      console.warn('Erro ao buscar temperatura:', err);
      set({ temperatura: null });
    }
  },
}
)
)

export default OpenMeteoApi;