import React, { useState } from 'react';
import { StyleSheet,StatusBar,Text, View, TouchableOpacity ,SafeAreaView, Image, Alert, _Image, ImageBackgroundBase } from 'react-native';

let temporizador = null;
let secs = 0;
let min = 0;
let horas = 0;

export default function AppCronometro() {
  // Iniciar o timer.
  function iniciar(){
    if(temporizador !== null){
      clearInterval(temporizador);
      temporizador = null;
      setBotao('Início')
    }else{
      // Para parar o timer
      setBotao('Parar')
      temporizador = setInterval(() => {
        secs++; // Conta segundos + 1

        // Minutos
        if(secs == 60){
          secs = 0;
          min++; // Conta minutos +1 quando segundos for igual a 60
        }

        // Horas
        if(min == 60){
          min = 0;
          horas++;  // Conta horas +1 quando minutos for igual a 60
        }

        let formatado = (horas < 10 ?'0'+ horas : horas)+ ':' +(min < 10 ?'0'+ min : min)
        + ':' +(secs < 10 ?'0'+ secs : secs);

        setNumero(formatado);
      },1000);
      setBotao('Parar')
    }
  }

  function zerar(){
    if(temporizador !== null){
        clearInterval(temporizador);
        temporizador = null;
    }
    setNumero(0)
    setMedido(numero);
    secs = 0;
    min = 0;
    horas = 0;
    setBotao('Início');
  }

  const [numero, setNumero] = useState('');
  const [botao, setBotao] = useState('Início');
  const [medido, setMedido] = useState('');
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Image 
      source={require('./assets/Relogio.png')}
      style={styles.imagem}
      />

      <Text style={styles.texto}>{numero == 0?'00:00:00':numero}</Text>

      <View style={styles.botaoArea}>

        <TouchableOpacity style={styles.botao} onPress={iniciar}>
          <Text style={styles.textoBotao}>{botao}</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={zerar}>
          <Text style={styles.textoBotao}>Zerar</Text>

        </TouchableOpacity>

      </View>
      <View style={styles.areaTempoMedido}>
        <Text style={styles.tempoMedido}>{medido}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    position:'absolute',
    bottom: "200px",
    fontSize:40,
    color:'black',
    marginTop:-165,
    fontWeight:'bold',

  },
  botaoArea:{
    flexDirection:'row',
    marginTop: 150,
    margin: 18,
    
    
  },
  
  imagem:{
    width:"300px",
    height:"300px",
  },


  botao:{
    backgroundColor:"#FFF",
    margin:10,
    borderRadius:9,
    padding:15,
    fontWeight:'bold',
    fontSize:50,
  },
  textoBotao:{
    fontSize:20,
    fontWeight:"bold",
  },
  areaTempoMedido:{
    marginTop:10
  },
  tempoMedido:{
    fontSize:30,
    fontStyle:'italic',
    color:"black",
    fontWeight:"600",
  }
});