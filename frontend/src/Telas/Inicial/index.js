import React, { useEffect, useRef } from 'react';
import { Text, Image, View, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import ImagemFundo from '../../../assets/imagemFundo.jpg';
import QuotesAndTranslation from '../../Zustand/QuotesAndTranslation';

const { width, height } = Dimensions.get('screen');

export default function Inicial({navigation}) {
  const { frase, pegaFrase } = QuotesAndTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pegaFrase();
  }, []);

  useEffect(() => {
    if (frase) {
      // Inicia a animação de fade-in suave
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, // Duração em milissegundos
        useNativeDriver: true,
      }).start();
    }
  }, [frase]);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#00000094' }}>
        <Image source={ImagemFundo} style={{ width: width, height: '100%', position: 'absolute', opacity: 0.5 }} resizeMode="cover" />
        
        {frase && (
          <Animated.Text style={{ 
            fontSize: 20, 
            color: '#FFFFFF', 
            textAlign: 'center', 
            position: 'absolute', 
            top: 300, 
            left: 20, 
            right: 20, 
            fontStyle: 'italic',
            opacity: fadeAnim // Vincula a opacidade animada
          }}>
            {frase}
          </Animated.Text>
        )}

        <View style={{ width: width, height: height * 1.05, alignItems: 'center' }}>
          <TouchableOpacity style={{ width: width * 0.9, height: 50, backgroundColor: '#ffd970', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 500, elevation: 5 }} 
          onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ fontSize: 18, color: '#000000' }}>Fazer login</Text>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#FFFFFF' }}>Não possui uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={{ fontSize: 18, color: '#ffbb00', fontWeight: 'bold' }}>Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
