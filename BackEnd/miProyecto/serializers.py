from rest_framework import serializers
from .models import PerfilUsuario, Curso, Tarea, Inscripcion, Entrega, Logro
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    
    class Meta:
        model = PerfilUsuario
        fields = ['id', 'usuario', 'rol', 'avatar', 'xp_total', 'nivel_actual']

class CursoSerializer(serializers.ModelSerializer):
    docente = UserSerializer(read_only=True)
    
    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'descripcion', 'codigo_acceso', 'docente', 'color_tema', 'creado_en']

class TareaSerializer(serializers.ModelSerializer):
    curso = CursoSerializer(read_only=True)
    
    class Meta:
        model = Tarea
        fields = ['id', 'curso', 'titulo', 'instrucciones', 'xp_recompensa', 'fecha_entrega']

class InscripcionSerializer(serializers.ModelSerializer):
    estudiante = UserSerializer(read_only=True)
    curso = CursoSerializer(read_only=True)
    
    class Meta:
        model = Inscripcion
        fields = ['id', 'estudiante', 'curso', 'unido_en']

class EntregaSerializer(serializers.ModelSerializer):
    tarea = TareaSerializer(read_only=True)
    estudiante = UserSerializer(read_only=True)
    
    class Meta:
        model = Entrega
        fields = ['id', 'tarea', 'estudiante', 'contenido', 'estado', 'xp_ganada', 'entregado_en']

class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = ['id', 'nombre', 'descripcion', 'nombre_icono', 'xp_requerida']



class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        # Crear usuario base
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        # Crear perfil asociado
        PerfilUsuario.objects.create(
            usuario=user,
            rol="estudiante",
            avatar="default.png",
            xp_total=0,
            nivel_actual=1
        )
        return user