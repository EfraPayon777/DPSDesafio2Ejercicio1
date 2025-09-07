import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppointmentService } from '../services/AppointmentService';
import AppointmentCard from '../components/AppointmentCard';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function HomeScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    try {
      const allAppointments = await AppointmentService.getAllAppointments();
      // Ordenar por fecha
      const sortedAppointments = allAppointments.sort((a, b) => 
        new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
      );
      setAppointments(sortedAppointments);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las citas');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  const handleDeleteAppointment = (id, clientName) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que quieres eliminar la cita de ${clientName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AppointmentService.deleteAppointment(id);
              await loadAppointments();
              Alert.alert('Éxito', 'Cita eliminada correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la cita');
            }
          },
        },
      ]
    );
  };

  const handleEditAppointment = (appointment) => {
    navigation.navigate('EditAppointment', { appointment });
  };

  const renderAppointment = ({ item }) => (
    <AppointmentCard
      appointment={item}
      onEdit={handleEditAppointment}
      onDelete={handleDeleteAppointment}
    />
  );

  const numColumns = isTablet ? 2 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Citas Programadas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAppointment')}
        >
          <Text style={styles.addButtonText}>+ Nueva Cita</Text>
        </TouchableOpacity>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay citas programadas</Text>
          <Text style={styles.emptySubtext}>
            Toca "Nueva Cita" para agregar la primera cita
          </Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={numColumns} // Forzar re-render cuando cambie numColumns
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
  },
}); 