import React, { useEffect, useState } from "react";

import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

import solFundo from '../../../assets/solFundo.jpg';
import montanhasFundo from '../../../assets/montanhasFundo.jpg';


import serenoLogo from '../../../assets/serenoLogo.png';
export default function Registro({navigation}) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Image
        source={montanhasFundo}
        style={styles.imagemFundo}
      />

      <Text style={styles.frase}>Um novo capítulo da sua jornada começa aqui!</Text>
  

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

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#FFFFFF"
          value={nome}
          onChangeText={setNome}
        />

        <TouchableOpacity style={styles.botao} onPress={() => {
          navigation.navigate('HomeScreen') }}>
          <Text style={styles.textoBotao}>Registrar</Text>
        </TouchableOpacity>
        
        
        <Image
        source={serenoLogo}
        style={styles.logo}
        />


      </View>



    </ScrollView>
  )
};