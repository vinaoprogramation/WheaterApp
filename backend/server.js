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

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast?latitude=-24.5475&longitude=-51.6361&hourly=temperature_2m&timezone=auto'
    );

    const temperatura = response.data?.hourly?.temperature_2m?.[0];

    return res.status(200).json({
      Temperatura: temperatura,
    });
  } catch (error) {
    console.error('Erro ao buscar temperatura padrão:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar temperatura padrão' });
  }
});

app.get('/api/:latitude/:longitude/:hora', async (req, res) => {
  try {
    const latitude = Number(req.params.latitude);
    const longitude = Number(req.params.longitude);
    const hora = Number(req.params.hora);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const indiceHora = Math.max(0, Math.min(23, Math.floor(hora)));

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=auto`
    );

    const temperatura = response.data?.hourly?.temperature_2m?.[indiceHora];

    return res.status(200).json({
      Temperatura: temperatura,
    });
  } catch (error) {
    console.error('Erro ao buscar temperatura por coordenadas:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar temperatura' });
  }
});



app.get('/revgeocoding/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = Number(req.params.latitude);
    const longitude = Number(req.params.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const response = await axios.get(
    );

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
