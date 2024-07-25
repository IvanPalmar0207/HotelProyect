from rest_framework import serializers
from habitacionesAPI.models import tb_estado, tb_habitacion, tb_mobiliario, tb_tipoHabitacion, tb_paqueteMobiliario


class tb_estadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_estado
        fields = '__all__'
        
class tb_habitacionSerializer(serializers.ModelSerializer):
    image_tpH = serializers.ImageField(use_url=True)
    class Meta:
        model = tb_habitacion
        fields = '__all__'
        
        
class tb_mobiliarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_mobiliario
        fields = '__all__'
        
class tb_tipoHabitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_tipoHabitacion
        fields = '__all__'
        
class tb_paqueteMobiliarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_paqueteMobiliario
        fields = '__all__'