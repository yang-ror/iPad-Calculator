import { StyleSheet, Text, View, Pressable } from "react-native";
import useDeviceSize from "../hooks/useDeviceSize";
import getLighterColor from "../functions/getLighterColor";

const Button = ({
  label,
  color,
  bgColor,
  func,
  smallFont = false,
  doubleSize = false,
  highlight = false,
}) => {
  const { mainWidth } = useDeviceSize();
  const buttonSize = mainWidth * 0.25;

  return (
    <View
      style={{
        width: buttonSize * (doubleSize ? 2 : 1),
        height: buttonSize,
        padding: buttonSize * 0.09,
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: highlight ? "white" : bgColor,
            alignItems: doubleSize ? "" : "center",
            paddingLeft: doubleSize ? buttonSize * 0.3 : 0,
          },
          pressed && { backgroundColor: getLighterColor(bgColor) },
        ]}
        onPress={() => func(label)}
      >
        <Text
          style={{
            color: highlight ? "rgb(0, 135, 145)" : color,
            fontSize: buttonSize / (smallFont ? 3 : 2.5),
          }}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
