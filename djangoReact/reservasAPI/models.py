from django.db import models
from habitacionesAPI.models import tb_habitacion
from usuariosAPI.models import tb_usuarios

# Create your models here.

class tb_reserva(models.Model):
    codigo_res = models.AutoField(primary_key=True,verbose_name="Numero de la reserva")
    numeroDocumento_cli = models.ForeignKey(tb_usuarios, verbose_name="Numero de documento del usuario", on_delete=models.CASCADE)
    fechaInicio_res = models.DateTimeField(verbose_name='Fecha de inicio', auto_now=False, auto_now_add=False)
    fechaSalida_res = models.DateTimeField(verbose_name='Fecha de salida', auto_now=False, auto_now_add=False)
    cantidadJovenes_res = models.IntegerField(verbose_name='Cantidad de jovenes')
    cantidadAdultos_res = models.IntegerField(verbose_name='Cantidad de adultos')
    codigo_hab = models.ForeignKey(tb_habitacion, verbose_name="Codigo de la habitacion", on_delete=models.CASCADE)