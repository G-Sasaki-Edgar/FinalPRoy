import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, GraduationCap, Users, Eye, Sparkles } from 'lucide-react-native';
import { GlobalStyles, Colors } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [screen, setScreen] = useState('login');
  const [role, setRole] = useState('estudiante');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setError("");
      // Guardar el token en almacenamiento local
      await AsyncStorage.setItem("token", data.access);

      // Navegar a la pantalla principal
      navigation.replace("Main");
    } else {
      setError(data.detail || "Error al iniciar sesión");
    }
  } catch (err) {
    setError("No se pudo conectar al servidor");
  }
};


  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/api/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,   // puedes usar el email como username
          email,
          password,
          role,
          first_name: nombre
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        // Después de registrar, puedes navegar al login o loguear automáticamente
        navigation.replace("Main");
      } else {
        setError(data.detail || "Error al registrar usuario");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    }
  };


  return (
    <LinearGradient colors={Colors.gradient} style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={GlobalStyles.card}>
          <View style={GlobalStyles.logoContainer}>
            <GraduationCap color="#fff" size={35} fill="#fff" />
          </View>

          {screen === 'login' ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text style={GlobalStyles.title}>EduGamefy</Text>
              <Text style={GlobalStyles.subtitle}>Aprende jugando, crece aprendiendo</Text>

              <Text style={GlobalStyles.label}>Usuario</Text>
              <View style={GlobalStyles.inputContainer}>
                <Mail color="#9CA3AF" size={20} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Ingrese su email o username"
                  autoCapitalize="none"
                  style={GlobalStyles.input}
                  keyboardType="default"
                />
              </View>

              <Text style={GlobalStyles.label}>Contraseña</Text>
              <View style={GlobalStyles.inputContainer}>
                <Lock color="#9CA3AF" size={20} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Ingrese su contraseña"
                  secureTextEntry
                  style={GlobalStyles.input}
                />
                <Eye color="#9CA3AF" size={20} />
              </View>

              {error ? <Text style={{ color: '#DC2626', marginBottom: 12, textAlign: 'center' }}>{error}</Text> : null}

              <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin}>
                <Text style={GlobalStyles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
               


              <TouchableOpacity onPress={() => setScreen('register')} style={{ marginTop: 20 }}>
                <Text style={GlobalStyles.footerText}>¿No tienes una cuenta? <Text style={GlobalStyles.linkBold}>Regístrate aquí</Text></Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text style={GlobalStyles.title}>Crear Cuenta</Text>
              <Text style={GlobalStyles.subtitle}>Únete a nuestra comunidad educativa</Text>

              <Text style={GlobalStyles.label}>¿Cómo te unirás?</Text>
              <View style={GlobalStyles.roleRow}>
                <TouchableOpacity
                  style={[GlobalStyles.roleButton, role === 'estudiante' && GlobalStyles.roleActive]}
                  onPress={() => setRole('estudiante')}
                >
                  <GraduationCap color={role === 'estudiante' ? '#7C3AED' : '#9CA3AF'} size={24} />
                  <Text style={[GlobalStyles.roleText, role === 'estudiante' && GlobalStyles.roleTextActive]}>Estudiante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyles.roleButton, role === 'docente' && GlobalStyles.roleActive]}
                  onPress={() => setRole('docente')}
                >
                  <Users color={role === 'docente' ? '#7C3AED' : '#9CA3AF'} size={24} />
                  <Text style={[GlobalStyles.roleText, role === 'docente' && GlobalStyles.roleTextActive]}>Docente</Text>
                </TouchableOpacity>
              </View>

              <Text style={GlobalStyles.label}>Nombre Completo</Text>
              <View style={GlobalStyles.inputContainer}>
                <User color="#9CA3AF" size={20} />
                <TextInput
                  value={nombre}
                  onChangeText={setNombre}
                  placeholder="Tu nombre"
                  style={GlobalStyles.input}
                />
              </View>

              <Text style={GlobalStyles.label}>Correo Electrónico</Text>
              <View style={GlobalStyles.inputContainer}>
                <Mail color="#9CA3AF" size={20} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ejemplo@correo.com"
                  style={GlobalStyles.input}
                />
              </View>

              <Text style={GlobalStyles.label}>Contraseña</Text>
              <View style={GlobalStyles.inputContainer}>
                <Lock color="#9CA3AF" size={20} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="........"
                  secureTextEntry
                  style={GlobalStyles.input}
                />
              </View>

             <TouchableOpacity style={GlobalStyles.button} onPress={handleRegister}>
                <Text style={GlobalStyles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen('login')} style={{ marginTop: 15 }}>
                <Text style={GlobalStyles.footerText}>¿Ya tienes cuenta? <Text style={GlobalStyles.linkBold}>Inicia sesión</Text></Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
