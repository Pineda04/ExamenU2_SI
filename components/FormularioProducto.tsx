import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useFormulario from "../hooks/useFormulario";

interface ProductoFormulario {
  codigo: string;
  nombre: string;
  categoria: string;
  cantidad: string;
  precio: string;
  fechaIngreso: string;
  observaciones: string;
}

const FormularioProducto = () => {
  // Para obtener fecha actual en formato YYYY-MM-DD como en lenguajes de programación
  const fechaActual = new Date().toISOString().split("T")[0];

  const estadoInicial: ProductoFormulario = {
    codigo: "",
    nombre: "",
    categoria: "electronica",
    cantidad: "",
    precio: "",
    fechaIngreso: fechaActual,
    observaciones: "",
  };

  const validaciones = {
    codigo: {
      requerido: true,
      maxLength: 10,
    },
    nombre: {
      requerido: true,
      minLength: 3,
    },
    cantidad: {
      requerido: true,
      esNumero: true,
      min: 1,
      validacion: (valor: string) => Number.isInteger(Number(valor)),
      mensajeError: "Debe ser un número entero positivo",
    },
    precio: {
      requerido: true,
      esNumero: true,
      min: 0,
      validacion: (valor: string) =>
        !isNaN(parseFloat(valor)) && parseFloat(valor) > 0,
      mensajeError: "Debe ser un número positivo",
    },
  };

  const {
    valores,
    errores,
    cargando,
    esValido,
    actualizarCampo,
    enviarFormulario,
  } = useFormulario(estadoInicial, validaciones);

  // Para renderizar los inputs
  const renderizarCampo = (
    label: string,
    campo: keyof ProductoFormulario,
    placeholder: string,
    keyboardType: "default" | "numeric" | "decimal-pad" = "default",
    esRequerido: boolean = false,
    multiline: boolean = false,
    numberOfLines: number = 1
  ) => (
    <View className="mt-4">
      <Text className="text-2xl mb-2">
        {label} {esRequerido && <Text className="text-red-500">*</Text>}
      </Text>
      <TextInput
        className={`border rounded-md p-3 bg-white ${
          errores[campo] ? "border-red-500" : "border-gray-300"
        }`}
        value={valores[campo]}
        onChangeText={(texto) => actualizarCampo(campo, texto)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "auto"}
      />
      {errores[campo] && (
        <Text className="text-red-500 text-sm mt-1">{errores[campo]}</Text>
      )}
    </View>
  );

  return (
    <ScrollView className="flex-1">
      <Text className="text-3xl font-bold text-center">
        Registro de Productos
      </Text>

      {/* El codigo del producto */}
      {renderizarCampo(
        "Código de producto",
        "codigo",
        "Ej: PROD001",
        "default",
        true
      )}

      {/* El nombre del producto */}
      {renderizarCampo(
        "Nombre del producto",
        "nombre",
        "Nombre del producto",
        "default",
        true
      )}

      {/* Categoría */}
      <View className="mb-4">
        <Text className="text-2xl mt-4 mb-2">Categoría</Text>
        <View className="border rounded-md bg-white border-gray-300 px-2">
          <Picker
            selectedValue={valores.categoria}
            onValueChange={(valor) => actualizarCampo("categoria", valor)}
          >
            <Picker.Item label="Electrónica" value="electronica" />
            <Picker.Item label="Ropa" value="ropa" />
            <Picker.Item label="Alimentos" value="alimentos" />
            <Picker.Item label="Hogar" value="hogar" />
          </Picker>
        </View>
      </View>

      {/* Cantidad */}
      {renderizarCampo("Cantidad", "cantidad", "Ej: 10", "numeric", true)}

      {/* Precio unitario */}
      {renderizarCampo(
        "Precio unitario",
        "precio",
        "Ej: 19.99",
        "decimal-pad",
        true
      )}

      {/* Fecha de ingreso */}
      {renderizarCampo("Fecha de ingreso", "fechaIngreso", "YYYY-MM-DD")}

      {/* Observaciones */}
      {renderizarCampo(
        "Observaciones (opcional)",
        "observaciones",
        "Observaciones adicionales",
        "default",
        false,
        true,
        4
      )}

      {/* Boton par aenviar */}
      <TouchableOpacity
        className={`rounded-md p-4 mt-2 ${
          esValido ? "bg-blue-600" : "bg-gray-400"
        }`}
        onPress={enviarFormulario}
        disabled={!esValido || cargando}
      >
        {cargando ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-medium text-base mt-4">
            Registrar Producto
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FormularioProducto;
