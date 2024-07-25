from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def proyectoModuloApis(request):    
    apiUrl = {
        "Gestion de Usuario" : "/usuariosAPI/",
        "Gestion de Habitaciones" : "/habitacionesAPI/",
        "Gestion de Reservas" : "/reservasAPI/",
        "Gestion de Servicios" : "/serviciosAPI/",
        "Gestion de Factura" : "/facturasAPI/"
    }
    return Response(apiUrl)
