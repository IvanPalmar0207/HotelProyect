from django.urls import path, include
from usuariosAPI.views import moduloUsuariosApi
from usuariosAPI.views import rolViewSet, tipoDocumentoViewSet, usuarioViewSet
from rest_framework import routers

routerRol = routers.DefaultRouter()
routerRol.register(f'rol', rolViewSet)

routerTipoDocumento = routers.DefaultRouter()
routerTipoDocumento.register(f'tipoDocumento',tipoDocumentoViewSet)

routerUsuario = routers.DefaultRouter()
routerUsuario.register(f'usuarios',usuarioViewSet)

urlpatterns = [
    path("", moduloUsuariosApi, name = 'moduloUsuariosApi'),
    path("rol/", include(routerRol.urls)),
    path('tipoDocumento/', include(routerTipoDocumento.urls)),
    path('usuarios/', include(routerUsuario.urls))
]