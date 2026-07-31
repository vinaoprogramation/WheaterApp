import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import ImagemFundo from '../../../assets/imagemFundo.jpg';
import RegistroLogin from '../../Zustand/RegistroLogin';
import serenoLogo from '../../../assets/serenoLogo.png';

export default function Login({ navigation }) {
  const fazLogin = RegistroLogin((state) => state.fazLogin);
  const estaAutenticado = RegistroLogin((state) => state.estaAutenticado);
  const erro = RegistroLogin((state) => state.erro);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loga = async (emailDigitado, senhaDigitada) => {
    if (!emailDigitado || !senhaDigitada) {
      Alert.alert('Atenção', 'Email e senha são necessários.');
      return;
    }

    const sucesso = await fazLogin(emailDigitado, senhaDigitada);
    if (!sucesso) {
      Alert.alert('Falha no login', erro || 'Não foi possível fazer login.');
    }
  };

  useEffect(() => {
    if (estaAutenticado) {
      navigation.navigate('HomeScreen');
    }
  }, [estaAutenticado, navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Image
        source={ImagemFundo}
        style={styles.imagemFundo}
      />

      <Image
      source={serenoLogo}
      style={styles.logo}
      resizeMode="contain"
      />

      <View style={styles.conteudo}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#FFFFFF"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

<TouchableOpacity style={styles.botao} onPress={() => {
          loga(email, senha)
           }}>
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
        
        <Text style={styles.frase}>Bem Vindo de Volta!</Text>


      </View>



    </ScrollView>
  )
}
