from django.urls import path,include
from rest_framework import routers
from serviciosAPI.views import serviciosAPI
from serviciosAPI.views import tb_categoriaViewSet, tb_servicioViewSet, tb_consumoViewSet

routerCategoria = routers.DefaultRouter()
routerCategoria.register(r'categoria', tb_categoriaViewSet)

routerServicio = routers.DefaultRouter()
routerServicio.register(r'servicios',tb_servicioViewSet)

routerConsumo = routers.DefaultRouter()
routerConsumo.register(r'consumo',tb_consumoViewSet)

urlpatterns = [
    path('', serviciosAPI, name = 'serviciosAPI'),
    path('apiCategoria/',include(routerCategoria.urls)),
    path('apiServicio/', include(routerServicio.urls)),
    path('apiConsumo/', include(routerConsumo.urls))
]
