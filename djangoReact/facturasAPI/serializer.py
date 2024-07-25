from rest_framework import serializers
from facturasAPI.models import tb_factura, tb_metodoPago

class tb_facturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_factura
        fields = '__all__'
        
class tb_metodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_metodoPago
        fields = '__all__'