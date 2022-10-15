import React from 'react'
import { Text, SafeAreaView, View, StyleSheet,  } from 'react-native'

const Header = () => {
  return (
    <SafeAreaView>

        <Text style={styles.texto}>Planificador de Gastos</Text>
        
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    
    texto: {
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: -30
    }
})

export default Header