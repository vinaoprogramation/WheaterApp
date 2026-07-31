import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './styles';
import montanhasFundo from '../../../assets/montanhasFundo.jpg';
import RegistroLogin from '../../Zustand/RegistroLogin';
import serenoLogo from '../../../assets/serenoLogo.png';

export default function Registro({ navigation }) {
  const fazRegistro = RegistroLogin((state) => state.fazRegistro);
  const estaAutenticado = RegistroLogin((state) => state.estaAutenticado);
  const erro = RegistroLogin((state) => state.erro);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const registra = async (nomeDigitado, emailDigitado, senhaDigitada) => {
    if (!nomeDigitado || !emailDigitado || !senhaDigitada) {
      Alert.alert('Atenção', 'Nome, email e senha são necessários.');
      return;
    }

    const sucesso = await fazRegistro(nomeDigitado, emailDigitado, senhaDigitada);
    if (!sucesso && erro) {
      Alert.alert('Falha no cadastro', erro);
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
          registra(nome, email, senha)
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