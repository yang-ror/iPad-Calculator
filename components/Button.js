import { 
  StyleSheet, 
  Text, 
  View,
  Pressable
} from 'react-native';
import useDeviceWidth from '../hooks/useDeviceWidth';
import getLighterColor from '../functions/getLighterColor';

const Button = ({ label, color, bgcolor, func, doubleSize = false }) => {
  const deviceWidth = useDeviceWidth()
  const buttonSize = deviceWidth * 0.25

  return (
    <View style={{ width: buttonSize * (doubleSize ? 2 : 1), height: buttonSize, padding: buttonSize * 0.1 }}>
      <Pressable
        style={({ pressed }) => [ 
          styles.buttom,
          { backgroundColor: bgcolor },
          pressed && { backgroundColor: getLighterColor(bgcolor) }
        ]} 
        onPress={ () => func(label) }
      >
        <Text style={{ color: color, fontSize: 64 }}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttom: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Button