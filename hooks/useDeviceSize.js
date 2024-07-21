import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

function get16x9Ratio(height, width) {
  if (height > (width / 9) * 16) {
    return { height: (width / 9) * 16, width: width };
  } else {
    return { height: height, width: (height / 16) * 9 };
  }
}

const useDeviceSize = () => {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  const [mainWidth, setMainWidth] = useState(
    get16x9Ratio(
      Dimensions.get("window").height,
      Dimensions.get("window").width
    ).width
  );
  const [mainHeight, setMainHeight] = useState(
    get16x9Ratio(
      Dimensions.get("window").height,
      Dimensions.get("window").width
    ).height
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
      setHeight(window.height);
      setMainWidth(get16x9Ratio(window.height, window.width).width);
      setMainHeight(get16x9Ratio(window.height, window.width).height);
    });

    return () => subscription.remove();
  }, []);

  return { width, height, mainWidth, mainHeight };
};

export default useDeviceSize;
