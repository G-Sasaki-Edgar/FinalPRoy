import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/buscar-cursos/?q=${query}`);
      const data = await res.json();
      // Aquí puedes navegar a una pantalla de resultados y pasarle los cursos
      navigation.navigate('ResultadosCursos', { cursos: data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={{fontSize: 24}}>☰</Text> 
      </TouchableOpacity>
      
      <View style={styles.searchContainer}>
         <Ionicons name="search-outline" size={18} color="#9CA3AF" />
         <TextInput 
           placeholder="Buscar cursos..." 
           style={styles.input} 
           value={query}
           onChangeText={setQuery}
           onSubmitEditing={handleSearch} // dispara búsqueda al presionar Enter
         />
      </View>

      <View style={styles.rightSection}>
        <Ionicons name="notifications-outline" size={22} color="#6B7280" style={{marginRight: 15}} />
        <View style={styles.avatar}><Text style={styles.avatarText}>ED</Text></View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  nav: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
  },
  searchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#F3F4F6', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    marginHorizontal: 10,
    height: 40
  },
  input: { marginLeft: 5, flex: 1, fontSize: 14 },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { 
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    backgroundColor: '#8B5CF6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});
