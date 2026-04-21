import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../components/common/NavBar';
import { Colors, GlobalStyles } from '../constants/theme';

export default function GenericScreen({ route }) {
  const title = route.params?.title || route.name;

  return (
    <View style={GlobalStyles.screenContainer}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Aquí irá el contenido de la sección.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textMain,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
});
