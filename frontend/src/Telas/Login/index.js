import React, { useEffect, useState } from "react";

import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

import ImagemFundo from '../../../assets/imagemFundo.jpg';

import RegistroLogin from "../../Zustand/RegistroLogin";

import serenoLogo from '../../../assets/serenoLogo.png';
export default function Login({navigation}) {
  const fazLogin = RegistroLogin((state) => state.fazLogin);

  const logado = RegistroLogin((state) => state.logado);


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loga = (email, senha) => {
    if(!email || !senha){
      alert("Email e senha são necessários")
    }
    fazLogin(email, senha)  
  }

  useEffect(() => {
    if(logado){
      navigation.navigate('HomeScreen')
    }
  }, [logado])

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
