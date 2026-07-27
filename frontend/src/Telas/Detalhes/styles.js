import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005596', // Sua cor azul de fundo,
  },
  dia: {
    color: '#ffffff',
    fontSize: 30,
    width: width,
    position: 'relative',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 80
  },
  dataFlat: {
    color: '#d1e1f5',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#ffffff3a',
    textShadowRadius: 3,
    textShadowOffset: { width: 1, height: 1 },
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
    paddingVertical: 15,
    flexDirection: 'row',
    marginTop: 5,
    verticalAlign: 'middle',
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexWrap: 'wrap'
  },
  fundo:{
    paddingBottom: 200
  }
});

export default styles;