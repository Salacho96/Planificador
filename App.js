//to create this proyect "npx react-native init planificador"
//to run it we use "npx react-native run-ios"

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Pressable,
  Image, 
  Modal,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGastos from './src/components/FormularioGastos';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import { generarId } from './src/helpers';


const App= () => {
  const [isValidPresupuesto,setisValidPresupuesto] = useState(false)
  const [presupuesto,setPresupuesto]=useState(0)

  const [gastos,setGastos]=useState([])
  const [modal,setModal] = useState(false)

  const [gasto,setGasto] = useState({})

  const [filtro,setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])


  //segundo useEffect
  useEffect(()=>{
    const obtenerPresupuestoStorage = async () =>{
      try {
        const presupuestoStorage  = await AsyncStorage.getItem('panificador_presupuesto') ?? 0

        
        if(presupuestoStorage >0 ){
          setPresupuesto(presupuestoStorage)
          setisValidPresupuesto(true)
        }


      } 
      catch (error) {
        console.log(error)
      }
    
    }
    obtenerPresupuestoStorage() 
  }, [])

//primer useEffect
  useEffect(()=>{
    if(isValidPresupuesto){
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('panificador_presupuesto',presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  },[isValidPresupuesto])




  

  //cuarto useEffect
  useEffect(() =>{
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('panificador_gastos') 
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  },[])


  //tercer useEffect
  useEffect(()=>{
    const guardarGastosStorage = async () =>{
      try {
        await AsyncStorage.setItem('panificador_gastos',JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  },[gastos])



  const handleNuevoPresupuesto = (presupuesto)=> {
    if(Number(presupuesto)>0){
      setisValidPresupuesto(true)
      console.log('presupuesto valido')//revisamos el presupuesto y verificamos que sea mayor que 0
    }else{
      Alert.alert('Error','El Valor debe ser Mayor a 0','OK')
    }
  }

  const handleGasto= gasto =>{
    if( [gasto.nombre, gasto.categoria,gasto.cantidad].includes('') ){
      Alert.alert(
        "Error",
        "Todos los Campos Son Obligatorios",
        [{text:'OK'}]
      )
      return

    }

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
      //console.log('Edicion')
    }else{
      gasto.id=generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id => {
    Alert.alert(
      'Desea Eliminar el Gasto?',
      'Recuerde que un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id )

          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }}
      ]
    )
    // console.log('eliminando', id)
  }


  const resetearApp = () =>{
    Alert.alert(
      'Deseas resetear la App?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()//solo con este metodo de clear nos borra los datos en presupuesto y gastos pero nos deja en la misma vista
            setisValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])

          } catch (error) {
            console.log(error)
          }
        }} 
      ]
    )
  } 

  return (

    <View style={styles.contenedor}>

      <ScrollView>
        <View style={styles.header}>

          <Header/>

          {isValidPresupuesto ?  (
            <ControlPresupuesto 
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}

        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
              
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )
        }

      
      </ScrollView>
      
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
        >
          <FormularioGastos
            modal={modal}
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}


      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={()=>{
            setModal(!modal)
          }}
        >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
      

    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  imagen:{
    width: 60,
    height: 60,
    // position: 'absolute',
    // right: 30,
    // bottom: 40,
  },
  pressable:{
    // backgroundColor: 'red',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 40,

  }
});

export default App;
