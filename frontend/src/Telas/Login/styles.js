import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102c41d2',
  },
  imagemFundo: {
    width: width, height: '100%', position: 'absolute', opacity: 0.6
  },
  texto: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  botao: {
    width: width * 0.9, height: 50, backgroundColor: '#0a4797', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5, zIndex: 1, marginTop: 20
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
  textoBotao: {
    fontSize: 18, color: '#ffffff'
  },
  registroContainer: {
    flexDirection: 'row', marginTop: 20, alignItems: 'center'
  },
  textoRegistro: {
    fontSize: 18, color: '#176bda', fontWeight: 'bold',
    textShadowColor: '#696969',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  input: {
    width: width * 0.9,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  conteudo:{
    width: width, height: height * 0.64, alignItems: 'center', marginTop: 300, backgroundColor: 'rgba(0, 61, 97, 0.8)', borderRadius: 30, paddingTop: 20
  },
  frase:{
    fontSize: 25,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 70,
  },
  logo: {
    width: width , height: width , marginTop: 10, marginBottom: 20,
     position: 'absolute', zIndex: 1
  }
});

export default styles;