from django.shortcuts import render
from usuariosAPI.serializers import tb_rolSerializer, tb_tpDocumentoSerializer, tb_usuariosSerializer
from usuariosAPI.models import tb_rol, tb_usuarios, tb_tpDocumento
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['GET'])
def moduloUsuariosApi(request):
    
    apiUrl = {
        "Api de los tipos de Rol" : "/rol/",
        "Api de los tipos de documento" : "/tipoDocumento/",
        "Api de los usuarios" : "/usuarios/"    
    }

    return Response(apiUrl)

class rolViewSet(viewsets.ModelViewSet):
    queryset = tb_rol.objects.all()
    serializer_class = tb_rolSerializer

class tipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = tb_tpDocumento.objects.all()
    serializer_class = tb_tpDocumentoSerializer
    
class usuarioViewSet(viewsets.ModelViewSet):
    queryset = tb_usuarios.objects.all()
    serializer_class = tb_usuariosSerializer