import React, { useEffect, useState } from "react";

import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

import solFundo from '../../../assets/solFundo.jpg';
import montanhasFundo from '../../../assets/montanhasFundo.jpg';


import RegistroLogin from "../../Zustand/RegistroLogin";

import serenoLogo from '../../../assets/serenoLogo.png';
export default function Registro({navigation}) {

  const fazRegistro = RegistroLogin((state) => state.fazRegistro);

  const logado = RegistroLogin((state) => state.logado);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');


    const registra = (nome, email, senha) => {
      if(!nome || !email || !senha){
        alert("Email e senha e nomesão necessários")
      }
      registra(nome, email, senha)  
    }
  
    useEffect(() => {
      if(logado){
        navigation.navigate('HomeScreen')
      }
      
    }, [logado])

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
          placeholder="Nome"
          placeholderTextColor="#FFFFFF"
          value={nome}
          onChangeText={setNome}
        />


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
          fazRegistro(nome, email, senha)
           }}>
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