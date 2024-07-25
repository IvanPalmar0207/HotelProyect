from django.urls import path, include
from reservasAPI.views import moduloReservaAPI
from reservasAPI.views import reservaViewSet
from rest_framework import routers

routerReserva = routers.DefaultRouter()
routerReserva.register(r'apiReserva',reservaViewSet)

urlpatterns = [
    path('', moduloReservaAPI, name = 'moduloReservaAPI'),
    path('apiReserva/', include(routerReserva.urls))
]
