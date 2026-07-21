const express = require('express');
const axios = require('axios');
const cors = require('cors');

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

app.listen(3000, () => {
  console.log('API funcionando em http://localhost:3000');
});