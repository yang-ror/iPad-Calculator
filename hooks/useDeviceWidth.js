import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useDeviceWidth = () => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDeviceWidth(window.width);
    });

    return () => subscription.remove();
  }, []);

  return deviceWidth;
};

export default useDeviceWidth;