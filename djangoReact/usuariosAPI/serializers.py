from rest_framework import serializers
from usuariosAPI.models import tb_rol, tb_tpDocumento, tb_usuarios

class tb_rolSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_rol
        fields = '__all__'
        
class tb_tpDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_tpDocumento
        fields = '__all__'
        
class tb_usuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = tb_usuarios
        fields = '__all__'    