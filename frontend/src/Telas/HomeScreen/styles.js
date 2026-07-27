import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005596', // Sua cor azul de fundo,
  },
  containerImagem: {
    width: width,
    height: width * 1.5,
    position: 'relative', // Garante que o degradê fique preso a este bloco,
  },
  imagemFundo: {
    width: '100%',
    height: '100%',

  },
  gradient: {
    position: 'absolute',
    width: width,
    height: width * 1.5,
  },
  cidade: {
    color: '#ffffff',
    fontSize: 70,
    width: width,
    position: 'absolute',
    zIndex: 2,
    marginTop: 160,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#0000008f',
    textShadowOffset: { width: 0.2, height: 0.2 },
    textShadowRadius: 7
  },
  frase: {
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 80,
    fontWeight: '500',
    fontStyle: 'italic'

  },

  temperatura: {
    color: '#1e7deb',
    fontSize: 22,
    position: 'absolute',
    zIndex: 2,
    marginTop: 100,
    fontWeight: 'regular',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    width: 100,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10
  },
  data:{
    color: '#ffffff',
    fontSize: 30,
    position: 'absolute',
    zIndex: 2,
    marginTop: 60,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    
  },
  hora: {
    color: '#ffffff',
    fontSize: 80,
    position: 'absolute',
    zIndex: 2,
    marginTop: 350,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  conteudo: {
    backgroundColor: '#014172',
    width: width,
    alignSelf: 'center',
    zIndex: 0,
    borderRadius: 8,
    marginBottom: 100,
    marginTop: 120,
    paddingVertical: 20,

  },
  texto: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#9bdaff',
    zIndex: 1

  },
  informacaoTexto: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    zIndex: 1,
    verticalAlign: 'middle'
  },


  informacao: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    zIndex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 5
  },

  informacoes: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 2,
    marginTop: 5,
    verticalAlign: 'middle'
  },
  previsao: {
    backgroundColor: '#000000',
    width: width,
    alignSelf: 'center',
    zIndex: 0,
    
    paddingVertical: 20,
    paddingBottom: 200
  },
  tituloPrevisao: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#9bdaff',
    zIndex: 1
  },
  conteudoPrevisao: {
    backgroundColor: '#ffffff00',
    zIndex: 1,
    width: width,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    
  },
  flatList: {
    shadowColor: '#ffffff',
    width: width,
    alignSelf: 'center'
  },
  dataView:{
    marginVertical: 20
  },
  dataFlat:{
    color: '#aed4ff',
    fontSize: 40,
    textAlign: 'left',
    fontWeight: 'bold',
    width: 200,
    textShadowColor: '#ffffff3a',
    textShadowRadius: 3,
    textShadowOffset: {width: 1, height: 1},
    marginLeft: 15
  }

});

export default styles;
