from rest_framework import serializers
from reservasAPI.models import tb_reserva

class tb_reservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_reserva
        fields = '__all__'