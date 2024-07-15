import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet,
  View
} from 'react-native';
import useDeviceWidth from './hooks/useDeviceWidth'
import FunctionButtons from './components/FunctionButtons';
import NumberPad from './components/NumberPad'
import ZeroAndDot from './components/ZeroAndDot'
import Operators from './components/Operators'

export default function App() {
  const deviceWidth = useDeviceWidth()
  return (
    <View style={ styles.container }>
      <StatusBar style="auto" />
      <View style={ styles.funcAndNum }>
        <View style={[ styles.numberPad, { width: deviceWidth * 0.75 } ]}>
          <FunctionButtons />
        </View>
        <View style={[ styles.numberPad, { width: deviceWidth * 0.75 } ]}>
          <NumberPad />
        </View>
        <View style={[ styles.numberPad, { width: deviceWidth * 0.75 } ]}>
          <ZeroAndDot />
        </View>
      </View>
      <View style={ [styles.operators, { width: deviceWidth * 0.25 } ] }>
          <Operators />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  funcAndNum: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  operators: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
