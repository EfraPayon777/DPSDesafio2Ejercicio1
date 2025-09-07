# Taller Mecánico App

Una aplicación móvil desarrollada en React Native para la gestión de citas de un taller mecánico.

## Características

- ✅ **Formulario de registro de citas** con validaciones completas
- ✅ **Almacenamiento local** usando AsyncStorage
- ✅ **Interfaz responsiva** con Flexbox (1 columna en vertical, 2 en horizontal)
- ✅ **Navegación** con React Navigation Stack Navigator
- ✅ **Validaciones**:
  - Nombre del cliente mínimo 3 caracteres
  - Fecha y hora posteriores al momento actual
  - Prevención de citas duplicadas
- ✅ **Funcionalidades**:
  - Agregar nuevas citas
  - Editar citas existentes
  - Eliminar citas con confirmación
  - Lista organizada de citas

## Pantallas

1. **Pantalla de Inicio**: Muestra la lista de citas registradas
2. **Pantalla de Agregar Cita**: Formulario para registrar nueva cita
3. **Pantalla de Editar Cita**: Formulario para modificar cita existente

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar la aplicación:
```bash
npm start
```

## Dependencias Principales

- React Native
- Expo
- React Navigation
- AsyncStorage
- DateTimePicker

## Estructura del Proyecto
