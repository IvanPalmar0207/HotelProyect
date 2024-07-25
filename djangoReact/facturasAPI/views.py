from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from facturasAPI.serializer import tb_facturaSerializer, tb_metodoPagoSerializer
from facturasAPI.models import tb_factura, tb_metodoPago

class facturasViewSet(viewsets.ModelViewSet):
    queryset = tb_factura.objects.all()
    serializer_class = tb_facturaSerializer
    
class metodoPagoViewSet(viewsets.ModelViewSet):
    queryset = tb_metodoPago.objects.all()
    serializer_class = tb_metodoPagoSerializer

# Create your views here.

@api_view(['GET'])
def moduloFacturasAPI(request):
    
    apiURL1 = {
        'Api de las facturas' : '/apiFacturas/',
        'Api de los metodos de pago' : '/apiMetodoPago/'
    }
    
    return Response(apiURL1)