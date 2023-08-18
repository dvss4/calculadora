import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default function App() {

  const[escuro, setEscuro] = useState(false);
  const botoes = ['AC', `DEL`, `%`, `/`, 7,8,9,`*`, 4,5,6,`-`, 3,2,1,`+`,0,`.`, `+/-`, `=` ]       
  const[numero, setNumero] = useState('')
  const [historico, setHistorico] = useState('')

  function calculadora() {
    setNumero(eval(numero))
    return
  }

  function operador(botao){

    if(botao === '+' || botao === '-'|| botao === '*'|| botao === '/'|| botao === "."){
      setNumero( numero + " " + botao + " ")
    }

    switch(botao){
      case 'DEL':
        setNumero(numero.substring(0, (numero.length - 1)))
        return
      case 'AC':
        setHistorico("")
        setNumero('')
        return
      case "=":
        setHistorico(numero + " = ")
        calculadora()
        return
      case '+/-':
        if(parseFloat(numero)>0){
          setNumero(numero*(-1))
        } else{
          setNumero(Math.abs(parseFloat(numero).toString()))
        }
        return
      case'%':
        porcentagem = parseFloat(numero)/100
        setNumero(porcentagem.toString())
        return
    }
    setNumero(numero+ botao)
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: escuro? "#282f3b": "#f5f5f5",
     // alignItems: 'center',
     // justifyContent: 'center',
    },
    divisor:{
      backgroundColor: escuro === true? '#414853': '#ededed',
      width: '100%',
      height: 3
    },
    historico:{
      color: escuro? '#f5f5f5': '#282F38',
      fontSize: 20,
      marginRight: 10,
      alignSelf: "flex-end"
    },
    resultado:{
       backgroundColor: escuro? "#282f3b": "#f5f5f5",
       width: '100%',
       minHeight: 300,
       alignItems: 'flex-end',
       justifyContent: 'flex-end',
    },
    resultTexto:{
      color: escuro? "#f5f5f5": "#282f3b",
      margin:10,
      fontSize: 40,
    },
    botao_tema:{
      alignSelf: 'flex-start',
      bottom: 120,
      margin: 10,
      backgroundColor: escuro? "#7b8084": "#e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      

    },
    botoes:{
      backgroundColor: escuro?  "#282f3b": "#f5f5f5" ,
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex:2
    },
    botao:{
      borderRadius: 100,
      borderColor: escuro? '#3f4d5b': "#e5e5e5",
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 85,
      minHeight: 85,
      margin: 10,
      flex: 2,
    },
    textBotao:{
      fontWeight: "bold",
      fontSize: 20
    }

  });

  return (

    <SafeAreaView style={styles.container}>
    <StatusBar/>
      <View style={styles.resultado}>
        <TouchableOpacity style={styles.botao_tema} onPress={()=> escuro ? setEscuro(false): setEscuro(true)}>
          <Entypo name={escuro? "light-up" : 'moon'} size={24} color={escuro?"white": "black"}/>
        </TouchableOpacity>
        <Text style={styles.historico}>{historico}</Text>
        <Text style={styles.resultTexto}>{numero}</Text>
      </View>
      <View style = {styles.divisor}>
      </View>
      <View style={styles.botoes}>
        { botoes.map((botao) => 
          botao === '='?
          <TouchableOpacity style={[styles.botao, {backgroundColor: '#00b600'}]} key={botao} onPress={()=> operador(botao)}>
            <Text style = {[styles.textBotao, {color: "white", fontSize: 30}]}>{botao}</Text>
          </TouchableOpacity>: 
           <TouchableOpacity style={[styles.botao, {backgroundColor: typeof(botao)=== 'number'? escuro === true? '#303946': '#fff': escuro === true? '#414853': '#ededed'}]}  key={botao} onPress={()=> operador(botao)}>
           <Text style = {[styles.textBotao,{color: typeof(botao)=== 'number'? escuro === true? "#b5b7bb": "#7c7c7c": botao === 'AC'? '#b22222': '#00b600' }]}>{botao}</Text>
         </TouchableOpacity>) }

      </View>
    </SafeAreaView>

    );

    
}


