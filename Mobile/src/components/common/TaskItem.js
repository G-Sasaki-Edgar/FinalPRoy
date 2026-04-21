import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

const TaskItem = ({ title, subtitle, deadline, color }) => {
  return (
    <View style={styles.container}>
      {/* Línea de color lateral (como en Figma) */}
      <View style={[styles.statusLine, { backgroundColor: color }]} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {/* Color naranja para la urgencia */}
        <Text style={[styles.deadline, { color: Colors.orange }]}>Vence en {deadline}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    // Borde sutil
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statusLine: { width: 4, height: '80%', borderRadius: 2, marginRight: 15 },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', color: Colors.textMain },
  subtitle: { fontSize: 12, color: Colors.textLight },
  deadline: { fontSize: 11, fontWeight: 'bold', marginTop: 3 },
});

export default TaskItem;