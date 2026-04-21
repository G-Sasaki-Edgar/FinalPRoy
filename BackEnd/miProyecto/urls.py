from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PerfilUsuarioViewSet, CursoViewSet, TareaViewSet,
    InscripcionViewSet, EntregaViewSet, LogroViewSet,
    register, login
)

router = DefaultRouter()
router.register(r'perfiles', PerfilUsuarioViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'inscripciones', InscripcionViewSet)
router.register(r'entregas', EntregaViewSet)
router.register(r'logros', LogroViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/registro/', register, name='registro'),
    path('api/login/', login, name='login'),
    

]
