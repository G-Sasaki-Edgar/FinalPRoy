import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import NavBar from '../../components/common/NavBar';
import CourseCard from '../../components/common/CourseCard'; 
import TaskItem from '../../components/common/TaskItem';
import { Colors, GlobalStyles } from '../../constants/theme'; 

const StudentDashboard = () => {
  const [cursos, setCursos] = useState([]);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/cursos/")
      .then(res => res.json())
      .then(data => setCursos(data));

    fetch("http://localhost:8000/api/tareas/")
      .then(res => res.json())
      .then(data => setTareas(data));
  }, []);

  return (
    <View style={GlobalStyles.screenContainer}>
      <NavBar />
      <ScrollView contentContainerStyle={GlobalStyles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Bienvenida */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.textMain }}>
            ¡Bienvenido de nuevo! 👋
          </Text>
          <Text style={{ color: Colors.textLight }}>Continúa tu camino de aprendizaje</Text>
        </View>

        {/* --- SECCIÓN: MIS CURSOS --- */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={GlobalStyles.sectionTitle}>Mis Cursos</Text>
          <TouchableOpacity>
            <Text style={{ color: Colors.primary, fontSize: 12, fontWeight: 'bold' }}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {cursos.map(curso => (
          <CourseCard 
            key={curso.id}
            level={1} xpAvailable={0} 
            title={curso.nombre} subtitle={curso.descripcion} 
            progress={0} gradientColors={['#06B6D4', '#3B82F6']}
          />
        ))}

        {/* --- SECCIÓN: PRÓXIMAS TAREAS --- */}
        <Text style={GlobalStyles.sectionTitle}>Próximas Tareas</Text>
        
        {tareas.map(tarea => (
          <TaskItem 
            key={tarea.id}
            title={tarea.titulo} 
            subtitle={tarea.curso.nombre} 
            deadline={tarea.fecha_entrega} 
            color="#06B6D4" 
          />
        ))}

      </ScrollView>
    </View>
  );
};

export default StudentDashboard;
