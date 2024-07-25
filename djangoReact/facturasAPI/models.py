from django.db import models
from serviciosAPI.models import tb_reserva, tb_consumo

# Create your models here.

class tb_metodoPago(models.Model):
    codigo_mP = models.AutoField(primary_key = True, verbose_name = 'Codigo del metodo de pago')
    tipo_mP = models.CharField(max_length=70, verbose_name = 'Tipo de metodo de pago')

class tb_factura(models.Model):
    codigo_fac = models.AutoField(primary_key=True, verbose_name = 'Codigo de la factura')
    codigo_res = models.ForeignKey(tb_reserva, verbose_name = "Codigo de la Reserva", on_delete=models.CASCADE)
    numero_con = models.ManyToManyField(tb_consumo, verbose_name = "Codigo consumo")
    codigo_mP = models.ManyToManyField("tb_metodoPago", verbose_name = "Metodos de pago" )
    fechaEmision_fac = models.DateTimeField(verbose_name = 'Fecha de emision de la factura', auto_now_add=True)
    valorTotal_fac = models.FloatField(verbose_name = 'Valor total de la factura')