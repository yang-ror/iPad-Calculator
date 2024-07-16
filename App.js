import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import useDeviceSize from './hooks/useDeviceSize'
import Button from './components/Button';
import formatDisplay from './functions/formatDisplay'

export default function App() {
  const { mainWidth, mainHeight } = useDeviceSize()
  const [indicator, setIndicator] = useState('0')
  const [value, setValue] = useState(0)
  const [cache, setCache] = useState(0)
  const [operator, setOperator] = useState(null)
  const [dot, setDot] = useState(false)

  useEffect(() => {
    setIndicator(formatDisplay(value));
  }, [value])

  function onPress(btn) {
    if (btn === 'C') {
      setValue(0)
    } 
    
    else if (btn === 'AC') {
      setValue(0)
      setCache(0)
      setOperator(null)
    }

    else if (btn === '+/−') {
      setValue(prevState => prevState * -1)
    }

    else if (btn === '%') {
      setValue(prevState => prevState / 100)
    }

    else if (btn === '.') {
      if(Number(value) === value && value !== Math.floor(value)) {
        return
      }
      setDot(true)
    }

    else if (btn === '+' || btn === '−' || btn === '×' || btn === '÷') {
      setCache(value)
      setValue(0)
      setOperator(btn)
    }

    else if (btn === '=') {}
    
    else {
      setValue(parseInt(btn))
    }
  }

  return (
    <SafeAreaView style={ styles.container }>
      <StatusBar style="auto" />
      <View style={[ styles.main, { width: mainWidth, height: mainHeight } ]}>
        <View style={[ styles.indicator, { padding: mainWidth * 0.05 } ]}>
          <Text style={[ styles.indicatorText, { fontSize: mainWidth / 5.5 } ]}>{ indicator }</Text>
        </View>
        <View style= {styles.keyPad}>
          <Button label={ value === 0 ? 'AC' : 'C' } color={ 'black' } bgcolor={ 'rgb(180, 180, 180)' } func={ onPress } smallFont />
          <Button label={ '+/−' } color={ 'black' } bgcolor={ 'rgb(180, 180, 180)' } func={ onPress } smallFont />
          <Button label={ '%' } color={ 'black' } bgcolor={ 'rgb(180, 180, 180)' } func={ onPress } smallFont />
          <Button label={ '÷' } color={ 'white' } bgcolor={ 'rgb(0, 135, 145)' } func={ onPress } highlight={ operator === '÷' } />
          <Button label={ '7' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '8' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '9' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '×' } color={ 'white' } bgcolor={ 'rgb(0, 135, 145)' } func={ onPress } highlight={ operator === '×' } />
          <Button label={ '4' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '5' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '6' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '−' } color={ 'white' } bgcolor={ 'rgb(0, 135, 145)' } func={ onPress } highlight={ operator === '−' } />
          <Button label={ '1' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '2' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '3' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '+' } color={ 'white' } bgcolor={ 'rgb(0, 135, 145)' } func={ onPress } highlight={ operator === '+' } />
          <Button label={ '0' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } doubleSize />
          <Button label={ '.' } color={ 'white' } bgcolor={ 'rgb(60, 60, 60)' } func={ onPress } />
          <Button label={ '=' } color={ 'white' } bgcolor={ 'rgb(0, 135, 145)' } func={ onPress } />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    // backgroundColor: '#fff',
    // height: '100%'
  },
  indicator: {
    height: '25%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  indicatorText: {
    color: 'white',
    
  },
  keyPad: {
    height: '75%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
