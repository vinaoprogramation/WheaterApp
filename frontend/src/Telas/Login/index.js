import React, { useEffect, useState } from "react";

import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

import ImagemFundo from '../../../assets/imagemFundo.jpg';

import serenoLogo from '../../../assets/serenoLogo.png';
export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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

        <TouchableOpacity style={styles.botao} onPress={() => { navigation.navigate('HomeScreen') }}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.frase}>Bem Vindo de Volta!</Text>


      </View>



    </ScrollView>
  )
};