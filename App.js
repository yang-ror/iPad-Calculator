import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import useDeviceSize from './hooks/useDeviceSize'
import Button from './components/Button';
import formatDisplay from './functions/formatDisplay';
import calculate from './functions/calculate';

export default function App() {
  const darkGray = 'rgb(60, 60, 60)'
  const lightGray = 'rgb(180, 180, 180)'
  const mainColor = 'rgb(0, 135, 145)'

  const { mainWidth, mainHeight } = useDeviceSize()
  const [indicator, setIndicator] = useState('0')
  const [value, setValue] = useState(null)
  const [cache, setCache] = useState(null)
  const [operator, setOperator] = useState(null)
  const [operatorActive, setOperatorActive] = useState(false)
  const [dot, setDot] = useState(false)
  const [reset, setReset] = useState(false)
  const [finish, setFinish] = useState(false)
  const [previousCalculation, setPreviousCalculation] = useState(null)

  useEffect(() => {
    setIndicator(formatDisplay(value));
  }, [value])

  const onPress = (btn) => {
    if (btn === 'C') {
      setValue(null)
      if (operator) setOperatorActive(true)
    } 
    
    else if (btn === 'AC') {
      setValue(null)
      setCache(null)
      setOperator(null)
    }

    else if (btn === '+/−') {
      setValue(value * -1)
    }

    else if (btn === '%') {
      setValue(value / 100)
    }

    else if (btn === '.') {
      if (!(Number(value) === value && value !== Math.floor(value))) {
        setDot(true)
        if (reset) {
          setValue(0)
          setReset(false)
        }
      }
    }

    else if (btn === '+' || btn === '−' || btn === '×' || btn === '÷') {
      setOperator(btn)
      setOperatorActive(true)
      setReset(true)
      setCache(value)
    }

    else if (btn === '=') {
      if (operator){
        let num1, num2

        if (cache !== null && value !== null && !reset) {
          num1 = cache
          num2 = value
        }

        let result = calculate(num1, operator, num2)

        setPreviousCalculation({
          operator,
          value
        })

        setOperator(null)
        setValue(result)
        setFinish(true)
      } else {
        let result = calculate(value, previousCalculation.operator, previousCalculation.value)
        setValue(result)
      }

      setCache(null)
      setReset(true)
    }
    
    else {
      if (reset) {
        setValue(parseFloat(dot ? '0.' : '' + btn))

        if (dot) setDot(false)

        setReset(false)

        if (finish) {
          setCache(value)
          setFinish(false)
        }
      } else {
        const curNum = value ? value.toString() : '0'
        const newNum = btn
        const newValue = dot ? parseFloat(curNum + '.' + newNum) : parseFloat(curNum + newNum)
        
        if (dot) setDot(false)

        setValue(newValue)
      }
      setOperatorActive(false)
    }
  }

  return (
    <SafeAreaView style={ styles.container }>
      <StatusBar style="auto" />
      <View style={[ styles.main, { width: mainWidth, height: mainHeight } ]}>
        <View style={[ styles.indicator, { padding: mainWidth * 0.05 } ]}>
          <Text style={[ styles.indicatorText, { fontSize: mainWidth / 5.5 } ]}>{ `${indicator}${dot ? '.' : ''}` }</Text>
        </View>
        <View style= {styles.keyPad}>
          <Button label={ value === null ? 'AC' : 'C' } color={ 'black' } bgColor={ lightGray } func={ onPress } smallFont />
          <Button label={ '+/−' } color={ 'black' } bgColor={ lightGray } func={ onPress } smallFont />
          <Button label={ '%' } color={ 'black' } bgColor={ lightGray } func={ onPress } smallFont />
          <Button label={ '÷' } color={ 'white' } bgColor={ mainColor } func={ onPress } highlight={ operatorActive && operator === '÷' } />
          <Button label={ '7' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '8' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '9' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '×' } color={ 'white' } bgColor={ mainColor } func={ onPress } highlight={ operatorActive && operator === '×' } />
          <Button label={ '4' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '5' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '6' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '−' } color={ 'white' } bgColor={ mainColor } func={ onPress } highlight={ operatorActive && operator === '−' } />
          <Button label={ '1' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '2' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '3' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '+' } color={ 'white' } bgColor={ mainColor } func={ onPress } highlight={ operatorActive && operator === '+' } />
          <Button label={ '0' } color={ 'white' } bgColor={ darkGray } func={ onPress } doubleSize />
          <Button label={ '.' } color={ 'white' } bgColor={ darkGray } func={ onPress } />
          <Button label={ '=' } color={ 'white' } bgColor={ mainColor } func={ onPress } />
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
