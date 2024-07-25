from django.db import models
from reservasAPI.models import tb_reserva

# Create your models here.

class tb_categoria(models.Model):
    codigo_cat = models.AutoField(primary_key=True, verbose_name = 'Codigo de la categoria')
    nombre_cat = models.CharField(max_length=70, verbose_name = 'Nombre de la categoria')
    descripcion_cat = models.TextField(verbose_name = 'Descripcion de la categoria')
    imagen_cat = models.ImageField(verbose_name = 'Imagen de la categoria',upload_to=None, height_field=None, width_field=None, max_length=None)
    
class tb_servicio(models.Model):
    codigo_ser = models.AutoField(primary_key =True,verbose_name = 'Codigo del servicio')
    nombre_ser = models.CharField(max_length=70, verbose_name = 'Nombre del servicio o producto')
    descripcion_ser = models.TextField(verbose_name = 'Descripcion del servicio')
    imagen_ser = models.ImageField(verbose_name = 'Imagen del servicio',upload_to=None, height_field=None, width_field=None, max_length=None)    
    codigo_cat = models.ForeignKey("tb_categoria", verbose_name = "Categoria del servicio", on_delete=models.CASCADE)
    
class tb_consumo(models.Model):
    codigo_res = models.ForeignKey(tb_reserva, verbose_name = "Numero de la reserva", on_delete=models.CASCADE)
    codigo_ser = models.ForeignKey("tb_servicio", verbose_name = "Codigo del servicio consumido", on_delete=models.CASCADE)
    numero_con = models.AutoField(primary_key = True, verbose_name = "Codigo del consumo")
    fecha_con = models.DateTimeField(verbose_name = "Fecha del consumo",auto_now_add=True)
    cantidad_con = models.IntegerField(verbose_name = "Cantidad consumida")
    precioUnitario_con = models.FloatField(verbose_name = "Precio unitario del producto")
    