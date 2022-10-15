import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import { Text, View, TextInput, Pressable, StyleSheet }  from 'react-native'
import globalStyles from '../styles'


const NuevoPresupuesto = ({presupuesto,setPresupuesto,handleNuevoPresupuesto}) => {


    // useEffect(() => {
    //     const obtenerAS = async() =>{
    //         try {
    //            const valor = await AsyncStorage.getItem('prueba_as') 
    //            console.log(valor)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     obtenerAS()
    // },[])

  return (
    <View style={styles.contenedor}>
        <Text style={styles.label}>Definir Presupuesto</Text>
        <TextInput
            keyboardType='numeric'
            placeholder='Agrega tu Presupuesto: Ej. 300'
            style={styles.input}
            value={presupuesto.toString()}
            onChangeText={setPresupuesto}
        />
        <Pressable 
            style={styles.boton}
            onPress={()=>{
                handleNuevoPresupuesto(presupuesto)
            }}
        >
            <Text style={styles.botonTexto}>Agegar Presupuesto</Text>
        </Pressable>
    </View>

   
  )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    texto: {
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6',
        marginBottom: 10
    },
    input:{
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30,
    },
    boton:{
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10,
    },
    botonTexto:{
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default NuevoPresupuesto