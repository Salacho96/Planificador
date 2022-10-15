import React from 'react'
import { Text,View, StyleSheet} from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos,setModal,setGasto,filtro,gastosFiltrados}) => {
  //console.log(gastos)
  return (

    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro ? gastosFiltrados.map( gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
        )): gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
        ))
      }

      {gastos.length === 0  || (gastosFiltrados.length === 0 && !!filtro) && (
        <Text style={styles.noGastos}>No hay gastos</Text>
      )}

      {/* {gastos.length === 0 ? 
        <Text style={styles.noGastos}>No hay Gastos</Text> : 
        gastos.map(gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
          )
        )
      } */}

    </View>

  )
}

const styles = StyleSheet.create({
    contenedor: {
      marginTop: 40,
      marginBottom: 100,
    },
    titulo:{
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: 20,
        marginBottom: -30
    },
    noGastos:{
        textAlign:  'center',
        fontSize: 20,
        marginVertical: 40,
       
    }
    
  });

export default ListadoGastos