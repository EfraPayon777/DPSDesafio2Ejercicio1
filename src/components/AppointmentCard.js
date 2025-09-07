import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function AppointmentCard({ appointment, onEdit, onDelete }) {
  const formatDateTime = (date, time) => {
    const dateObj = new Date(date + ' ' + time);
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.card, isTablet && styles.cardTablet]}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{appointment.clientName}</Text>
        <Text style={styles.vehicleModel}>{appointment.vehicleModel}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.dateTime}>
          {formatDateTime(appointment.date, appointment.time)}
        </Text>
        
        {appointment.description && (
          <Text style={styles.description} numberOfLines={2}>
            {appointment.description}
          </Text>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(appointment)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(appointment.id, appointment.clientName)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTablet: {
    flex: 1,
    marginHorizontal: 8,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  vehicleModel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  cardBody: {
    marginBottom: 16,
  },
  dateTime: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#f39c12',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 