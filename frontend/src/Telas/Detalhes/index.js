import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions, FlatList } from 'react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen')

import QuotesAndTranslation from '../../Zustand/QuotesAndTranslation';
import useNotification from '../../Zustand/Permissions/useNotification';
import useLocation from '../../Zustand/Permissions/useLocation';
import LocationIqApi from '../../Zustand/LocationIqApi';
import OpenMeteoApi from '../../Zustand/OpenMeteoApi';
import styles from './styles';


import porSolFundo from "../../../assets/porSolFundo.jpg"
import serenoLogo from '../../../assets/serenoLogo.png';
import nuvensFundo from "../../../assets/nuvensFundo.jpg"


export default function Detalhes({ navigation, route }) {
  const item = route.params

  //USE STATES
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [horaFormatada, setHoraFormatada] = useState(null);
  const [hora, setHora] = useState(null);
  const [dataFormatada, setDataFormatada] = useState(null)

  //CONSTANTES NATIVAS
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //ZUSTAND
  const pedirPermissaoLocalizacao = useLocation((state) => state.pedirPermissaoLocalizacao)

  const pedirPermissaoNotificacao = useNotification((state) => state.pedirPermissaoNotificacao)
  const enviarNotificacaoTeste = useNotification((state) => state.enviarNotificacaoTeste)

  const cidade = LocationIqApi((state) => state.cidade)
  const pegaCidade = LocationIqApi((state) => state.pegaCidade)

  const pegaPrevisao = OpenMeteoApi((state) => state.pegaPrevisao)

  const condicoesFuturas = OpenMeteoApi((state) => state.condicoesFuturas);





  //FUNÇÕES

  const obterLocalizacao = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const temPermissao = await pedirPermissaoLocalizacao();
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

  //useEffects


  useEffect(() => {
    obterLocalizacao();
  }, [obterLocalizacao]);

  useEffect(() => {
    if (location) {
      pegaPrevisao(location.coords.latitude, location.coords.longitude);
    }
  }, [location, pegaPrevisao]);


  useEffect(() => {
    if (location) {
      const horaAtual = new Date();
      const segS = horaAtual.getSeconds();
      const minM = String(horaAtual.getMinutes()).padStart(2, '0');
      const horaH = String(horaAtual.getHours()).padStart(2, '0');

      setHoraFormatada(horaH + ":" + minM);

      const resto = 60 - segS;

      const time = resto * 1000

      const timeOut = setTimeout(() => {
        obterLocalizacao();
      }, time);

      return () => clearTimeout(timeOut);
    }
  }, [location, obterLocalizacao])




  useEffect(() => {
    if (location && !cidade) {
      pegaCidade(location.coords.latitude, location.coords.longitude);
    }
  }, [location, cidade, pegaCidade]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

  }, []);

  return (
    <>

      <ScrollView style={styles.container}>

        <View style={styles.fundo}>

          <Text style={styles.dia}>Informações do Dia</Text>


          <Animated.Text style={[styles.dataFlat, { opacity: fadeAnim }]}>
            {`${item?.data?.split('-')[2]}/${item?.data?.split('-')[1]}`}
          </Animated.Text>


          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Chance de Chuva
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.chanceChuva}%
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Milímetros de Chuva
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.miliChuva}mm
            </Animated.Text>
          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Temperatura Máxima
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.temperaturaMax}C°
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Temperatura Mínima
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.temperaturaMin}C°
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Temperatura Média Esperada
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.temperaturaMedia}C°
            </Animated.Text>


          </View>



          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Índice de UV
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.indiceUv}%
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Condição Climática
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.condicaoClimatica}
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Velocidade do Vento
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.ventoMax}km/h
            </Animated.Text>


          </View>


          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Quantidade de Co
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {(item.qualidadeArCo).toFixed(2)}mg/m³
            </Animated.Text>


          </View>

          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Quantidade No2
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {(item.qualidadeArNo2).toFixed(2)}µg/m³
            </Animated.Text>


          </View>


          
          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Nascer do Sol
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.nascerSol}
            </Animated.Text>


          </View>



          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Pôr do Sol
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.porSol}
            </Animated.Text>


          </View>



          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Nascer da Lua
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.nascerLua}
            </Animated.Text>


          </View>



          <View style={styles.informacoes}>
            <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
              Fase da Lua
            </Animated.Text>

            <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
              {item.faseLua}
            </Animated.Text>


          </View>



        </View>
      </ScrollView>
    </>
  );
};