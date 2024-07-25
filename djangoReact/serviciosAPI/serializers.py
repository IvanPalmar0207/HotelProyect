from rest_framework import serializers
from serviciosAPI.models import tb_categoria, tb_servicio, tb_consumo

class tb_categoriaSerializer(serializers.ModelSerializer):
    imagen_cat = serializers.ImageField(use_url=True)
    class Meta:
        model = tb_categoria
        fields = '__all__'
        
class tb_servicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_servicio
        fields = '__all__'
        
class tb_consumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_consumo
        fields = '__all__'