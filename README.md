# Gestor de Citas - Taller Mecánico

## Descripción del Proyecto

Esta aplicación móvil desarrollada en React Native permite la gestión integral de citas para talleres mecánicos. La aplicación proporciona una interfaz intuitiva y funcional para administrar las citas de los clientes, incluyendo el registro, edición y eliminación de citas programadas.

## Características Principales

### Funcionalidades de Gestión
- Formulario completo de registro de citas con validaciones exhaustivas
- Almacenamiento local de datos utilizando AsyncStorage
- Interfaz de usuario responsiva implementada con Flexbox
- Navegación fluida entre pantallas mediante React Navigation

### Sistema de Validaciones
- Validación de nombre del cliente con mínimo de tres caracteres
- Verificación de que la fecha y hora sean posteriores al momento actual
- Prevención de citas duplicadas para la misma fecha y vehículo
- Validación de campos requeridos con retroalimentación visual

### Operaciones Disponibles
- Creación de nuevas citas con información detallada del cliente y vehículo
- Modificación de citas existentes manteniendo la integridad de los datos
- Eliminación de citas con confirmación previa para evitar errores
- Visualización organizada de todas las citas programadas

## Estructura de Pantallas

### Pantalla Principal
La pantalla de inicio presenta una lista completa de todas las citas registradas, organizadas cronológicamente. Incluye un botón de acceso rápido para agregar nuevas citas.

### Pantalla de Registro
Formulario dedicado para el registro de nuevas citas, incluyendo campos para nombre del cliente, modelo del vehículo, fecha y hora de la cita, y descripción opcional del problema.

### Pantalla de Edición
Interfaz para la modificación de citas existentes, pre-cargada con la información actual y validaciones actualizadas para mantener la consistencia de los datos.

## Especificaciones Técnicas

### Dependencias Principales
- React Native para el desarrollo de la aplicación móvil
- Expo como plataforma de desarrollo y despliegue
- React Navigation para la gestión de navegación entre pantallas
- AsyncStorage para el almacenamiento local de datos
- DateTimePicker para la selección de fechas y horas

### Arquitectura del Proyecto
```
src/
├── components/
│   └── AppointmentCard.js
├── screens/
│   ├── HomeScreen.js
│   ├── AddAppointmentScreen.js
│   └── EditAppointmentScreen.js
└── services/
    └── AppointmentService.js
```

## Instalación y Configuración

### Requisitos Previos
- Node.js instalado en el sistema
- npm o yarn como gestor de paquetes
- Expo CLI para el desarrollo
- Dispositivo móvil con Expo Go o emulador configurado

### Proceso de Instalación

1. Instalación de dependencias:
```bash
npm install
```

2. Inicio de la aplicación:
```bash
npm start
```

3. Opciones de ejecución:
- Presionar 'w' para abrir en navegador web
- Escanear código QR con Expo Go en dispositivo móvil
- Presionar 'a' para ejecutar en emulador Android

## Diseño Responsivo

La aplicación implementa un diseño adaptativo que se ajusta automáticamente al tamaño de la pantalla:
- Una columna en dispositivos móviles verticales
- Dos columnas en dispositivos con orientación horizontal o tablets

## Validaciones Implementadas

### Validación de Datos de Entrada
- Verificación de longitud mínima para nombres de clientes
- Validación de fechas y horas futuras
- Prevención de registros duplicados
- Control de campos obligatorios

### Manejo de Errores
- Mensajes de error descriptivos y contextuales
- Limpieza automática de errores al corregir campos
- Confirmaciones para operaciones destructivas
- Retroalimentación visual para estados de validación

## Consideraciones de Desarrollo

La aplicación está diseñada siguiendo las mejores prácticas de desarrollo en React Native, incluyendo:
- Separación clara de responsabilidades entre componentes
- Manejo eficiente del estado local y persistente
- Implementación de patrones de navegación estándar
- Optimización para diferentes tamaños de pantalla

## Soporte y Mantenimiento

Para reportar problemas o solicitar nuevas funcionalidades, se recomienda revisar la documentación técnica y seguir los estándares de desarrollo establecidos en el proyecto.