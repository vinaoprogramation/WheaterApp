import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';


import useStore from './zustand';
import cloudy from './assets/cloudy.gif';
import pedirPermissao, { enviarNotificacaoTeste } from './Permissoes';

export default function Salvar() {
  const temperatura = useStore((state) => state.temperatura);
  const pegaTemperatura = useStore((state) => state.pegaTemperatura);
  const pegaCidade = useStore((state) => state.pegaCidade);
  const cidade = useStore((state) => state.cidade);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const obterLocalizacao = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const temPermissao = await pedirPermissao();
      if (!temPermissao) {
        setErrorMsg('Permissão de localização foi negada.');
        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation(currentPosition);
    } catch (error) {
      console.warn('Erro ao obter localização:', error);
      setErrorMsg('Não foi possível obter a localização atual.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obterLocalizacao();
  }, [obterLocalizacao]);

  useEffect(() => {
    if (location) {
      const horaAtual = new Date().getHours();
      pegaTemperatura(location.coords.latitude, location.coords.longitude, horaAtual);
    }
  }, [location, pegaTemperatura]);

  useEffect(() => {
    if (location) {
      pegaCidade(location.coords.latitude, location.coords.longitude);
    }
  }, [location, pegaCidade]);

  return (
    <View style={styles.container}>

      <Image
        source={cloudy}
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Minha Localização</Text>

      {loading && <ActivityIndicator size="large" color="#2563eb" />}

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {location && !loading ? (
        <View style={styles.box}>
          <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
          <Text style={styles.text}>Precisão: {Math.floor(location.coords.accuracy)} metros</Text>

          {temperatura !== null && temperatura !== undefined ? (
            <Text style={styles.text}>Temperatura atual: {temperatura} °C</Text>
          ) : null}

          {cidade !== null && cidade !== undefined ? (
            <Text style={styles.text}>Cidade: {cidade}</Text>
          ) : null}
        </View>
      ) : null}

      {location && (
        <MapView
          style={{ width: '100%', height: 300 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}

      <Text style={styles.text}>Hora atual: {new Date().toLocaleTimeString()}</Text>

      <Text style={styles.text}>Data atual: {new Date().toLocaleDateString()}</Text>

      <TouchableOpacity onPress={obterLocalizacao} disabled={loading}
        style={styles.botao}
      >
        <Text style={styles.buttonText}>Atualizar Localização</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={enviarNotificacaoTeste} style={[styles.botao, styles.testButton]}>
        <Text style={styles.buttonText}>Enviar notificação de teste</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    zIndex: 1,
  },
  box: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 0,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    zIndex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    zIndex: 0,
  },
  botao: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  testButton: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 5,
  }
});
