from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from .models import Curso
from .serializers import CursoSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import PerfilUsuario, Curso, Tarea, Inscripcion, Entrega, Logro
from .serializers import (
    PerfilUsuarioSerializer, CursoSerializer, TareaSerializer,
    InscripcionSerializer, EntregaSerializer, LogroSerializer
)

# --- CRUD ViewSets ---
class PerfilUsuarioViewSet(viewsets.ModelViewSet):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer

class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer

class LogroViewSet(viewsets.ModelViewSet):
    queryset = Logro.objects.all()
    serializer_class = LogroSerializer

# --- Registro ---
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role', 'estudiante')

    if not username or not email or not password:
        return Response({'detail': 'Faltan datos obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
        return Response({'detail': 'El usuario o correo ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    perfil = PerfilUsuario.objects.create(usuario=user, rol=role, xp_total=0, nivel_actual=1, avatar="default.png")

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': perfil.rol,
        'xp_total': perfil.xp_total,
        'nivel_actual': perfil.nivel_actual,
        'avatar': perfil.avatar
    }, status=status.HTTP_201_CREATED)

# --- Login con JWT ---
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'detail': 'Credenciales incompletas.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(request, username=user.username, password=password)
    if user is None:
        return Response({'detail': 'Credenciales inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

    perfil = PerfilUsuario.objects.filter(usuario=user).first()

    # Generar tokens JWT
    refresh = RefreshToken.for_user(user)
    access = str(refresh.access_token)

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': perfil.rol if perfil else 'estudiante',
        'xp_total': perfil.xp_total if perfil else 0,
        'nivel_actual': perfil.nivel_actual if perfil else 1,
        'avatar': perfil.avatar if perfil else "default.png",
        'access': access,
        'refresh': str(refresh)
    })
@api_view(['GET'])
def buscar_cursos(request):
    query = request.GET.get('q', '')
    cursos = Curso.objects.filter(nombre__icontains=query) | Curso.objects.filter(descripcion__icontains=query)
    serializer = CursoSerializer(cursos, many=True)
    return Response(serializer.data)