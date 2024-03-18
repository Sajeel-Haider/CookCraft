import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import logo from "../assets/logo.jpg";

const FirstScreen = () => {
  const ring_1_padding = useSharedValue(0);
  const ring_2_padding = useSharedValue(0);

  useEffect(() => {
    ring_1_padding.value = 0;
    ring_2_padding.value = 0;
    setTimeout(
      () => (ring_1_padding.value = withSpring(ring_1_padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring_2_padding.value = withSpring(ring_2_padding.value + hp(5.5))),
      300
    );
  }, []);

  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-black">
      <Animated.View
        className=" bg-white/20 rounded-full"
        style={{ padding: ring_2_padding.value }}
      >
        <Animated.View
          className=" bg-white/20 rounded-full"
          style={{ padding: ring_1_padding.value }}
        >
          <Image source={logo} className="w-12 h-12" />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default FirstScreen;
