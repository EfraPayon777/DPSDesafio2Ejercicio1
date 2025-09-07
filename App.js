import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import AddAppointmentScreen from './src/screens/AddAppointmentScreen';
import EditAppointmentScreen from './src/screens/EditAppointmentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Citas del Taller' }}
        />
        <Stack.Screen 
          name="AddAppointment" 
          component={AddAppointmentScreen} 
          options={{ title: 'Nueva Cita' }}
        />
        <Stack.Screen 
          name="EditAppointment" 
          component={EditAppointmentScreen} 
          options={{ title: 'Editar Cita' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
