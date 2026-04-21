import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Importaciones actualizadas según tu estructura actual
import LoginScreen from '../screens/auth/LoginScreen';
import StudentDashboard from '../screens/dashboard/StudentDashboard';
import GenericScreen from '../screens/GenericScreen';
import { Colors } from '../constants/theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const drawerItems = [
  { name: 'Dashboard', label: 'Dashboard', icon: 'home-outline' },
  { name: 'MiPerfil', label: 'Mi Perfil', icon: 'person-outline' },
  { name: 'MisCursos', label: 'Mis Cursos', icon: 'book-outline' },
  { name: 'Tareas', label: 'Tareas', icon: 'checkmark-done-outline' },
  { name: 'Logros', label: 'Logros', icon: 'trophy-outline' },
  { name: 'Ranking', label: 'Ranking', icon: 'bar-chart-outline' },
  { name: 'Configuracion', label: 'Configuración', icon: 'settings-outline' },
];

function CustomDrawerContent(props) {
  const { state, navigation } = props;
  const activeRoute = state.routeNames[state.index];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScroll}>
      <View style={styles.drawerHeader}>
        <View style={styles.brandBadge}>
          <Text style={styles.brandBadgeText}>ED</Text>
        </View>
        <View>
          <Text style={styles.brandTitle}>EduGameFy</Text>
          <Text style={styles.brandRole}>Estudiante</Text>
        </View>
      </View>

      <View style={styles.drawerMenu}>
        {drawerItems.map(item => (
          <DrawerItem
            key={item.name}
            label={() => (
              <Text style={[styles.drawerLabel, activeRoute === item.name && styles.drawerLabelActive]}>
                {item.label}
              </Text>
            )}
            icon={() => (
              <Ionicons
                name={item.icon}
                size={20}
                color={activeRoute === item.name ? Colors.primary : '#6B7280'}
              />
            )}
            focused={activeRoute === item.name}
            onPress={() => navigation.navigate(item.name)}
            style={activeRoute === item.name ? styles.drawerItemActive : styles.drawerItem}
          />
        ))}
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerTitle}>¿Necesitas ayuda?</Text>
        <Text style={styles.footerText}>Visita nuestro centro de soporte</Text>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Configuracion')}>
          <Text style={styles.footerButtonText}>Ir a soporte</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerType: 'front', swipeEdgeWidth: 64 }}
    >
      <Drawer.Screen name="Dashboard" component={StudentDashboard} />
      <Drawer.Screen name="MiPerfil" component={GenericScreen} initialParams={{ title: 'Mi Perfil' }} />
      <Drawer.Screen name="MisCursos" component={GenericScreen} initialParams={{ title: 'Mis Cursos' }} />
      <Drawer.Screen name="Tareas" component={GenericScreen} initialParams={{ title: 'Tareas' }} />
      <Drawer.Screen name="Logros" component={GenericScreen} initialParams={{ title: 'Logros' }} />
      <Drawer.Screen name="Ranking" component={GenericScreen} initialParams={{ title: 'Ranking' }} />
      <Drawer.Screen name="Configuracion" component={GenericScreen} initialParams={{ title: 'Configuración' }} />
    </Drawer.Navigator>
  );
}



const styles = StyleSheet.create({
  drawerScroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  brandBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  brandBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textMain,
  },
  brandRole: {
    color: '#6B7280',
    marginTop: 4,
  },
  drawerMenu: {
    flex: 1,
    paddingTop: 6,
  },
  drawerItem: {
    borderRadius: 14,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  drawerItemActive: {
    borderRadius: 14,
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: '#EEF2FF',
  },
  drawerLabel: {
    fontSize: 16,
    color: '#374151',
  },
  drawerLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  drawerFooter: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
  },
  footerTitle: {
    fontWeight: '700',
    color: Colors.textMain,
    fontSize: 16,
    marginBottom: 6,
  },
  footerText: {
    color: '#6B7280',
    marginBottom: 12,
    fontSize: 14,
  },
  footerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}