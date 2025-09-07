import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppointmentService } from '../services/AppointmentService';

export default function EditAppointmentScreen({ route, navigation }) {
  const { appointment } = route.params;
  const [formData, setFormData] = useState({
    clientName: '',
    vehicleModel: '',
    date: '',
    time: '',
    description: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointment) {
      setFormData({
        clientName: appointment.clientName,
        vehicleModel: appointment.vehicleModel,
        date: appointment.date,
        time: appointment.time,
        description: appointment.description || '',
      });
      setSelectedDate(new Date(appointment.date));
      setSelectedTime(new Date(`2000-01-01T${appointment.time}`));
    }
  }, [appointment]);

  const validateForm = async () => {
    const newErrors = {};

    // Validar nombre del cliente
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre del cliente es requerido';
    } else if (formData.clientName.trim().length < 3) {
      newErrors.clientName = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar modelo del vehículo
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'El modelo del vehículo es requerido';
    }

    // Validar fecha
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const appointmentDateTime = new Date(formData.date + ' ' + formData.time);
      if (appointmentDateTime <= new Date()) {
        newErrors.date = 'La fecha y hora deben ser posteriores al momento actual';
      }
    }

    // Validar hora
    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    // Verificar duplicados (excluyendo la cita actual)
    if (formData.date && formData.vehicleModel) {
      const isDuplicate = await AppointmentService.checkDuplicateAppointment(
        formData.date,
        formData.vehicleModel,
        appointment.id
      );
      if (isDuplicate) {
        newErrors.duplicate = 'Ya existe una cita para este vehículo en esta fecha';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (await validateForm()) {
      try {
        await AppointmentService.updateAppointment(appointment.id, formData);
        Alert.alert(
          'Éxito',
          'Cita actualizada correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar la cita');
      }
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const dateString = selectedDate.toISOString().split('T')[0];
      setFormData({ ...formData, date: dateString });
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setSelectedTime(selectedTime);
      const timeString = selectedTime.toTimeString().split(' ')[0].substring(0, 5);
      setFormData({ ...formData, time: timeString });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Cliente *</Text>
          <TextInput
            style={[styles.input, errors.clientName && styles.inputError]}
            value={formData.clientName}
            onChangeText={(text) => setFormData({ ...formData, clientName: text })}
            placeholder="Ingrese el nombre del cliente"
            maxLength={50}
          />
          {errors.clientName && <Text style={styles.errorText}>{errors.clientName}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Modelo del Vehículo *</Text>
          <TextInput
            style={[styles.input, errors.vehicleModel && styles.inputError]}
            value={formData.vehicleModel}
            onChangeText={(text) => setFormData({ ...formData, vehicleModel: text })}
            placeholder="Ej: Toyota Corolla 2020"
            maxLength={50}
          />
          {errors.vehicleModel && <Text style={styles.errorText}>{errors.vehicleModel}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha de la Cita *</Text>
          <TouchableOpacity
            style={[styles.dateButton, errors.date && styles.inputError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {formData.date || 'Seleccionar fecha'}
            </Text>
          </TouchableOpacity>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hora de la Cita *</Text>
          <TouchableOpacity
            style={[styles.dateButton, errors.time && styles.inputError]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {formData.time || 'Seleccionar hora'}
            </Text>
          </TouchableOpacity>
          {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción del Problema</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Descripción opcional del problema..."
            multiline
            numberOfLines={4}
            maxLength={200}
          />
        </View>

        {errors.duplicate && (
          <Text style={styles.errorText}>{errors.duplicate}</Text>
        )}

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Actualizar Cita</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
  },
  updateButton: {
    backgroundColor: '#f39c12',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 