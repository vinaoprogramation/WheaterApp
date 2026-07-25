const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  return res.status(200).json({
    mensagem: 'Sucesso na API',
  });
});

app.get('/api/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = Number(req.params.latitude);
    const longitude = Number(req.params.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.TEMPERATURE_KEY}&q=${latitude},${longitude}&aqi=yes`
    );

    const data = response.data?.location?.localtime;
    const temperatura = response.data?.current?.temp_c;
    const humidade = response.data?.current.humidity;
    const sensacaoTermica = response.data?.current.feelslike_c;
    const condicaoClimatica = response.data?.current?.condition?.text;
    const velocidadeVento = response.data?.current?.wind_kph;
    const qualidadeArCo = response.data?.current?.air_quality?.co;
    const qualidadeArNo2 = response.data?.current?.air_quality?.no2;
    const indiceUv = response.data?.current?.uv;

    return res.status(200).json({
      Data: data,
      Temperatura: temperatura,
      Humidade: humidade,
      SensacaoTermica: sensacaoTermica,
      CondicaoClimatica: condicaoClimatica,
      VelocidadeVento: velocidadeVento,
      QualidadeArCo: qualidadeArCo,
      QualidadeArNo2: qualidadeArNo2,
      IndiceUv: indiceUv,
    });
  } catch (error) {
    console.error('Erro ao buscar informações de clima por coordenadas:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar informações' });
  }
});





app.get('/forecast/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = Number(req.params.latitude);
    const longitude = Number(req.params.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.TEMPERATURE_KEY}&q=${latitude},${longitude}&days=3&aqi=yes&alerts=no`
    );

    const dayOne = response.data?.forecast?.forecastday?.[0]
    const dayTwo = response.data?.forecast?.forecastday?.[1]
    const dayThree = response.data?.forecast?.forecastday?.[2]

    const informacoesDiaUm = {

      data: dayOne?.date,
      temperaturaMax: dayOne?.day?.maxtemp_c,
      temperaturaMin: dayOne?.day?.mintemp_c,
      temperaturaMedia: dayOne?.day?.avgtemp_c,
      ventoMax: dayOne?.day?.maxwind_kph,
      miliChuva: dayOne?.day?.totalprecip_mm,
      chanceChuva: dayOne?.day?.daily_chance_of_rain,
      indiceUv: dayOne?.day?.uv,
      condicaoClimatica: dayOne?.day?.condition?.text,
      qualidadeArCo: dayOne?.day?.air_quality?.co,
      qualidadeArNo2: dayOne?.day?.air_quality?.no2,
      nascerSol: dayOne?.astro?.sunrise,
      porSol: dayOne?.astro?.sunset,
      nascerLua: dayOne?.astro?.moonrise,
      porLua: dayOne?.astro?.monset,
      faseLua: dayOne?.astro?.moon_phase,

    };

    const informacoesDiaDois = {

      data: dayTwo?.date,
      temperaturaMax: dayTwo?.day?.maxtemp_c,
      temperaturaMin: dayTwo?.day?.mintemp_c,
      temperaturaMedia: dayTwo?.day?.avgtemp_c,
      ventoMax: dayTwo?.day?.maxwind_kph,
      miliChuva: dayTwo?.day?.totalprecip_mm,
      chanceChuva: dayTwo?.day?.daily_chance_of_rain,
      indiceUv: dayTwo?.day?.uv,
      condicaoClimatica: dayTwo?.day?.condition?.text,
      qualidadeArCo: dayTwo?.day?.air_quality?.co,
      qualidadeArNo2: dayTwo?.day?.air_quality?.no2,
      nascerSol: dayTwo?.astro?.sunrise,
      porSol: dayTwo?.astro?.sunset,
      nascerLua: dayTwo?.astro?.moonrise,
      porLua: dayTwo?.astro?.monset,
      faseLua: dayTwo?.astro?.moon_phase,

    };


    const informacoesDiaTres = {

      data: dayThree?.date,
      temperaturaMax: dayThree?.day?.maxtemp_c,
      temperaturaMin: dayThree?.day?.mintemp_c,
      temperaturaMedia: dayThree?.day?.avgtemp_c,
      ventoMax: dayThree?.day?.maxwind_kph,
      miliChuva: dayThree?.day?.totalprecip_mm,
      chanceChuva: dayThree?.day?.daily_chance_of_rain,
      indiceUv: dayThree?.day?.uv,
      condicaoClimatica: dayThree?.day?.condition?.text,
      qualidadeArCo: dayThree?.day?.air_quality?.co,
      qualidadeArNo2: dayThree?.day?.air_quality?.no2,
      nascerSol: dayThree?.astro?.sunrise,
      porSol: dayThree?.astro?.sunset,
      nascerLua: dayThree?.astro?.moonrise,
      porLua: dayThree?.astro?.monset,
      faseLua: dayThree?.astro?.moon_phase,

    };





    return res.status(200).json({
      diaUm: informacoesDiaUm,
      diaDois: informacoesDiaDois,
      diaTres: informacoesDiaTres,
    });
  } catch (error) {
    console.error('Erro ao buscar previsão do tempo por coordenadas:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar previsão' });
  }
});




app.get('/revgeocoding/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = Number(req.params.latitude);
    const longitude = Number(req.params.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const response = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${process.env.REVERSE_KEY}&lat=${latitude}&lon=${longitude}&format=json&`);

    const answer = response.data;

    const nomeCidade = answer?.address?.city || answer?.address?.town || answer?.address?.village || 'Cidade não encontrada';
    return res.status(200).json({
      Cidade: nomeCidade,
    });
  } catch (error) {
    console.error('Erro ao buscar cidade por coordenadas:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar cidade' });
  }
});

app.get('/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random/');
    const quote = response.data.map((item) => ({
      frase: item.q,
      autor: item.a,
    }));

    return res.status(200).json({
      Quote: quote?.[0],
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar citação' });
  }
});

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text: [text],
        target_lang: targetLang
      },
      {
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.status(200).json({ Translation: response.data.translations[0].text });
  } catch (error) {
    console.error('Erro ao traduzir texto:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Erro ao traduzir texto' });
  }
});

app.get('/quotes/translated', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random/');
    const quote = response.data.map((item) => ({
      frase: item.q,
      autor: item.a,
    }));

    const translatedQuote = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text: [quote?.[0]?.frase],
        target_lang: 'PT-BR'
      },
      {
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return res.status(200).json({
      Quote: translatedQuote.data.translations[0].text,
      Autor: quote.autor
    });
  } catch (error) {
    console.error('Erro ao buscar citação traduzida:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar citação traduzida' });
  }
})


app.listen(3000, () => {
  console.log('API funcionando em http://localhost:3000');
});


//4d629200f15b411c83b150719262307