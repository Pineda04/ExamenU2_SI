import { useState, useEffect } from 'react';

// Lista de codigos que existen, es que no le puse un store inge :( suficiente tenia con tailwind y yo era el problema
const codigosExistentes: string[] = ['ABC123', 'XYZ789', 'PRD456'];

interface Validacion {
  requerido?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  esNumero?: boolean;
  validacion?: (valor: any) => boolean;
  mensajeError?: string;
}

interface Validaciones {
  [key: string]: Validacion;
}

interface FormularioState {
  [key: string]: any;
}

const useFormulario = (initialState: FormularioState, validaciones: Validaciones) => {
  const [valores, setValores] = useState<FormularioState>(initialState);
  const [errores, setErrores] = useState<FormularioState>({});
  const [cargando, setCargando] = useState<boolean>(false);
  const [esValido, setEsValido] = useState<boolean>(false);

  // Actualizar un campoe en específico
  const actualizarCampo = (campo: string, valor: any): void => {
    setValores({
      ...valores,
      [campo]: valor
    });
  };

  // Validar todos los campos
  const validarFormulario = (): boolean => {
    let nuevosErrores: FormularioState = {};
    let formularioValido: boolean = true;

    // Aplicar validaciones para cada campo
    Object.keys(validaciones).forEach(campo => {
      const valor = valores[campo];
      const reglas = validaciones[campo];

      // Verificar si el código ya existe
      if (campo === 'codigo' && codigosExistentes.includes(valor)) {
        nuevosErrores[campo] = 'Este código ya existe';
        formularioValido = false;
        return;
      }

      // Validar campo obligatorio
      if (reglas.requerido && (!valor || (typeof valor === 'string' && valor.trim() === ''))) {
        nuevosErrores[campo] = 'Este campo es obligatorio';
        formularioValido = false;
        return;
      }

      // Validar longitud mínima
      if (reglas.minLength && typeof valor === 'string' && valor.length < reglas.minLength) {
        nuevosErrores[campo] = `Debe tener al menos ${reglas.minLength} caracteres`;
        formularioValido = false;
        return;
      }

      // Validar longitud máxima
      if (reglas.maxLength && typeof valor === 'string' && valor.length > reglas.maxLength) {
        nuevosErrores[campo] = `No puede exceder ${reglas.maxLength} caracteres`;
        formularioValido = false;
        return;
      }

      // Validar valor mínimo para números
      if (reglas.min !== undefined && Number(valor) < reglas.min) {
        nuevosErrores[campo] = `El valor mínimo es ${reglas.min}`;
        formularioValido = false;
        return;
      }

      // Validar formato de número
      if (reglas.esNumero && isNaN(Number(valor))) {
        nuevosErrores[campo] = 'Debe ser un número válido';
        formularioValido = false;
        return;
      }

      // Validación personalizada
      if (reglas.validacion && !reglas.validacion(valor)) {
        nuevosErrores[campo] = reglas.mensajeError || 'Valor inválido';
        formularioValido = false;
      }
    });

    setErrores(nuevosErrores);
    setEsValido(formularioValido);
    return formularioValido;
  };

  // Enviar el formulario
  const enviarFormulario = (): void => {
    if (validarFormulario()) {
      setCargando(true);
      
      // Se simula el retraso de la red con un time out
      setTimeout(() => {
        setCargando(false);
        setValores(initialState);
      }, 1500);
    }
  };

  // Validar cuando cambian los valores
  useEffect(() => {
    validarFormulario();
  }, [valores]);

  return {
    valores,
    errores,
    cargando,
    esValido,
    actualizarCampo,
    enviarFormulario
  };
};

export default useFormulario;
