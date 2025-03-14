import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css'

const _layout = () => {
  const [] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf')
  });

  return (
    <View className="flex-1 text-center pt-8 bg-blue-100">
      <Slot />
      <StatusBar style='light'/>
    </View>
  );
};

export default _layout;
