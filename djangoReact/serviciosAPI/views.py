from django.shortcuts import render, redirect
from  rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from serviciosAPI.serializers import tb_categoriaSerializer, tb_servicioSerializer, tb_consumoSerializer
from serviciosAPI.models import tb_categoria, tb_servicio, tb_consumo

# Create your views here.

class tb_categoriaViewSet(viewsets.ModelViewSet):
    queryset = tb_categoria.objects.all()
    serializer_class = tb_categoriaSerializer
    
class tb_servicioViewSet(viewsets.ModelViewSet):
    queryset = tb_servicio.objects.all()
    serializer_class = tb_servicioSerializer
    
class tb_consumoViewSet(viewsets.ModelViewSet):
    queryset = tb_consumo.objects.all()
    serializer_class = tb_consumoSerializer

@api_view(['GET'])
def serviciosAPI(request):
    apiUrls = {
        "Api de las categorias de servicios" : "/apiCategoria/",
        "Api de los Servicios" : "/apiServicio/",
        "Api de los consumos" : "/apiConsumo/"
    }
    return Response(apiUrls)    