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


export default function HomeScreen({navigation}) {
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
  const frase = QuotesAndTranslation((state) => state.frase)
  const pegaFrase = QuotesAndTranslation((state) => state.pegaFrase)

  const pedirPermissaoLocalizacao = useLocation((state) => state.pedirPermissaoLocalizacao)

  const pedirPermissaoNotificacao = useNotification((state) => state.pedirPermissaoNotificacao)
  const enviarNotificacaoTeste = useNotification((state) => state.enviarNotificacaoTeste)

  const cidade = LocationIqApi((state) => state.cidade)
  const pegaCidade = LocationIqApi((state) => state.pegaCidade)

  const pegaTemperatura = OpenMeteoApi((state) => state.pegaTemperatura)
  const {
    data,
    temperatura,
    humidade,
    sensacaoTermica,
    condicaoClimatica,
    velocidadeVento,
    qualidadeArCo,
    qualidadeArNo2,
    indiceUv
  } = OpenMeteoApi((state) => state.condicoes);

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
      pegaTemperatura(location.coords.latitude, location.coords.longitude);
      pegaPrevisao(location.coords.latitude, location.coords.longitude);
    }
  }, [location, pegaTemperatura, pegaPrevisao]);


  useEffect(() => {
    if (!data) return;
    const dataPura = data.split(" ")[0]
    const [ano, mes, dia] = dataPura.split("-");
    const dataObj = new Date(ano, mes - 1, dia)
    const resultado = dataObj.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long'
    })
    setDataFormatada(resultado)
  }, [data])

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
    if (!frase) {
      pegaFrase();
    }
  }, [pegaFrase]);


  useEffect(() => {
    if (frase) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [frase]);

  return (
    <>

      {temperatura ? <Text style={styles.temperatura}>{temperatura}C°</Text> : null}



      <ScrollView style={styles.container}>
        {dataFormatada ? <Text style={styles.data}>{dataFormatada}</Text> : null}

        <View style={styles.fundo}>
          {cidade ? <Text style={styles.cidade}>{cidade}</Text> : null}

          {horaFormatada ? <Text style={styles.hora}>{horaFormatada}</Text> : null}


          <View style={styles.containerImagem}>
            <Image source={nuvensFundo} style={styles.imagemFundo} />

            <LinearGradient
              colors={['transparent', '#005596']}
              style={styles.gradient}
            />
          </View>

          {frase && (
            <Animated.Text style={[styles.frase, { opacity: fadeAnim }]}>
              {frase}
            </Animated.Text>
          )}

          <View style={styles.conteudo}>


            <Text style={styles.texto}>Condições Atuais</Text>

            <View style={styles.informacoes}>
              <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                Sensação Térmica
              </Animated.Text>

              <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                {sensacaoTermica}C°
              </Animated.Text>
            </View>

            <View style={styles.informacoes}>
              <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                Humidade
              </Animated.Text>

              <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                {humidade}%
              </Animated.Text>
            </View>

            <View style={styles.informacoes}>
              <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                Condição Climática
              </Animated.Text>

              <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                {condicaoClimatica}
              </Animated.Text>
            </View>

            <View style={styles.informacoes}>
              <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                Velocidade do Vento
              </Animated.Text>

              <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                {velocidadeVento}km/h
              </Animated.Text>
            </View>

            <View style={styles.informacoes}>
              <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                Índice de UV
              </Animated.Text>

              <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                {indiceUv}%
              </Animated.Text>
            </View>




            <LinearGradient
              colors={['#005596', '#014172']} // Vai do transparente para o azul do fundo
              style={styles.gradient}
            />




          </View>


















          <View style={styles.previsao}>


            <Text style={styles.tituloPrevisao}>Previsões</Text>







            <LinearGradient
              colors={['#014172', '#000000']}
              style={styles.gradient}
            />







            <FlatList
              snapToInterval={width}
              disableIntervalMomentum
              snapToAlignment="start"
              decelerationRate={0.600}
              data={condicoesFuturas}
              style={styles.flatList}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              renderItem={({ item }) => <>
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Detalhes', item)
                }}
                >
                  
                  <View style={styles.conteudoPrevisao}>
                    <View style={styles.dataView}>

                      <Animated.Text style={[styles.dataFlat, { opacity: fadeAnim }]}>
                        {`${item?.data?.split('-')[2]}/${item?.data?.split('-')[1]}`}
                      </Animated.Text>


                    </View>

                    <View style={styles.informacoes}>
                      <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                        Chance de Chuva
                      </Animated.Text>

                      <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                        {item.chanceChuva}%
                      </Animated.Text>

=

                    </View>


                    <View style={styles.informacoes}>
                      <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                        Quantidade de Chuva
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
                        Índice UV
                      </Animated.Text>

                      <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                        {item.indiceUv}%
                      </Animated.Text>


                    </View>

                     <View style={styles.informacoes}>
                      <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                        Nascer do sol:
                      </Animated.Text>

                      <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                        {item.nascerSol}
                      </Animated.Text>


                    </View>


                     <View style={styles.informacoes}>
                      <Animated.Text style={[styles.informacaoTexto, { opacity: fadeAnim }]}>
                        Índice UV
                      </Animated.Text>

                      <Animated.Text style={[styles.informacao, { opacity: fadeAnim }]}>
                        {item.temperaturaMin}C°
                      </Animated.Text>


                    </View>




                  </View>

                </TouchableOpacity>

              </>}
            />




          </View>




        </View>
      </ScrollView>
    </>
  );
};