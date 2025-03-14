import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import FormularioProducto from '../components/FormularioProducto';

const InventarioApp = () => {
  return (
    <SafeAreaView className="flex-1">
      <FormularioProducto />
    </SafeAreaView>
  );
};

export default InventarioApp;
