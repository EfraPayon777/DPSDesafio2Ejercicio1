import AsyncStorage from '@react-native-async-storage/async-storage';

const APPOINTMENTS_KEY = '@appointments';

export const AppointmentService = {
  // Obtener todas las citas
  async getAllAppointments() {
    try {
      const appointments = await AsyncStorage.getItem(APPOINTMENTS_KEY);
      return appointments ? JSON.parse(appointments) : [];
    } catch (error) {
      console.error('Error al obtener citas:', error);
      return [];
    }
  },

  // Guardar una nueva cita
  async saveAppointment(appointment) {
    try {
      const appointments = await this.getAllAppointments();
      const newAppointment = {
        id: Date.now().toString(),
        ...appointment,
        createdAt: new Date().toISOString(),
      };
      appointments.push(newAppointment);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
      return newAppointment;
    } catch (error) {
      console.error('Error al guardar cita:', error);
      throw error;
    }
  },

  // Actualizar una cita existente
  async updateAppointment(id, updatedAppointment) {
    try {
      const appointments = await this.getAllAppointments();
      const index = appointments.findIndex(apt => apt.id === id);
      if (index !== -1) {
        appointments[index] = { ...appointments[index], ...updatedAppointment };
        await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
        return appointments[index];
      }
      throw new Error('Cita no encontrada');
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      throw error;
    }
  },

  // Eliminar una cita
  async deleteAppointment(id) {
    try {
      const appointments = await this.getAllAppointments();
      const filteredAppointments = appointments.filter(apt => apt.id !== id);
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filteredAppointments));
      return true;
    } catch (error) {
      console.error('Error al eliminar cita:', error);
      throw error;
    }
  },

  // Verificar si existe una cita duplicada (misma fecha + mismo vehículo)
  async checkDuplicateAppointment(date, vehicleModel, excludeId = null) {
    try {
      const appointments = await this.getAllAppointments();
      return appointments.some(apt => 
        apt.id !== excludeId && 
        apt.date === date && 
        apt.vehicleModel.toLowerCase().trim() === vehicleModel.toLowerCase().trim()
      );
    } catch (error) {
      console.error('Error al verificar duplicados:', error);
      return false;
    }
  }
}; 