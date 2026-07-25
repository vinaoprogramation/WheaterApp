import React, { useEffect, useRef } from 'react';
import { Text, Image, View, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import ImagemFundo from '../../../assets/imagemFundo.jpg';
import arvoreFundo from '../../../assets/arvoreFundo.jpg';
import nuvensEscuroFundo from '../../../assets/nuvensEscuroFundo.jpg';
import serenoLogo from '../../../assets/serenoLogo.png';
import Wheather from '../../../assets/Wheather.png';

import styles from './styles';

import QuotesAndTranslation from '../../Zustand/QuotesAndTranslation';

const { width, height } = Dimensions.get('screen');

export default function Inicial({navigation}) {

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        
        <Image source={nuvensEscuroFundo} style={styles.imagemFundo} resizeMode="cover" />
        


        <Image
          source={serenoLogo}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.conteudo}>
          <TouchableOpacity style={styles.botao} 
          onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.textoBotao}>Fazer login</Text>
          </TouchableOpacity>
          
          <View style={styles.registroContainer}>
            <Text style={styles.texto}>Não possui uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.textoRegistro}>Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
