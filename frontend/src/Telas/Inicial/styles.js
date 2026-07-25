import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003d61',
  },
  imagemFundo: {
    width: width, height: '100%', position: 'absolute', opacity: 0.6
  },
  texto: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  botao: {
    width: width * 0.9, height: 50, backgroundColor: '#0a4797', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 500, elevation: 5
  },
  logo: {
    width: width, height: width, position: 'absolute', marginTop: 80, zIndex: 1,
  },
  frase: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    top: 390,
    left: 20,
    right: 20,
    fontStyle: 'italic',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    fontWeight: 'bold',
  },
  conteudo: {
    width: width, height: height * 1.05, alignItems: 'center'
  },
  textoBotao: {
    fontSize: 18, color: '#ffffff'
  },
  registroContainer: {
    flexDirection: 'row', marginTop: 20, alignItems: 'center'
  },
  textoRegistro: {
    fontSize: 18, color: '#176bda', fontWeight: 'bold',

  }
});

export default styles;