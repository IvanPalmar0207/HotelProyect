from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from reservasAPI.serializers import tb_reservaSerializer, tb_reserva
from rest_framework import viewsets

# Create your views here.

class reservaViewSet(viewsets.ModelViewSet):
    queryset = tb_reserva.objects.all()
    serializer_class = tb_reservaSerializer


@api_view(['GET'])
def moduloReservaAPI(request):
    apiUrls = {
        'Gestion de la API de Reservas':'/apiReserva/'
    }
    return Response(apiUrls)