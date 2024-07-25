from django.db import models

# Create your models here.

class tb_estado(models.Model):
    codigo_ed = models.AutoField(primary_key = True, verbose_name = 'Codigo del Estado')
    tipo_ed = models.CharField(max_length=70, verbose_name = 'Tipo de Estado')

class tb_tipoHabitacion(models.Model):
    codigo_tpH = models.AutoField(primary_key=True, verbose_name='Codigo del tipo de habitacion')
    tipo_tpH = models.CharField(max_length=70,verbose_name='Tipo de habitacion')
    valorBase_tpH = models.FloatField(verbose_name='Valor base del tipo de habitacion')

class tb_paqueteMobiliario(models.Model):
    codigo_pMb = models.AutoField(primary_key = True, verbose_name='Codigo del paquete')
    paqueteTipo_pMb = models.CharField(max_length=70, verbose_name = 'Tipo de paquete')
    camasSecillas_pMb = models.IntegerField(verbose_name='Numero de camas sencillas')
    camasDobles_pMb = models.IntegerField(verbose_name='Numero de camas dobles')
    camasTriples_pMb = models.IntegerField(verbose_name='Numero de camas triples')
    numeroTelevisores_pMb = models.IntegerField(verbose_name='Numero de televisores')
    numeroBanos_pMb = models.IntegerField(verbose_name='Numero de baños')
    numeroToallas_pMb = models.IntegerField(verbose_name='Numero de toallas')
    numeroTocadores = models.IntegerField(verbose_name = 'Numero de tocadores')

class tb_mobiliario(models.Model):
    codigo_mB = models.AutoField(primary_key = True, verbose_name = 'Codigo del mobiliario')
    codigo_pMb = models.ForeignKey("tb_paqueteMobiliario", verbose_name="Codigo del paquete de mobiliario", on_delete=models.CASCADE)
    codigo_tpH = models.ForeignKey("tb_tipoHabitacion", verbose_name="Codigo del tipo de habitacion", on_delete=models.CASCADE)
    
class tb_habitacion(models.Model):
    codigo_hab = models.IntegerField(primary_key=True, verbose_name='Codigo de la habitacion')
    codigo_tpH = models.ForeignKey("tb_tipoHabitacion", verbose_name="Codigo del tipo de habitacion", on_delete=models.CASCADE)
    codigo_ed = models.ForeignKey("tb_estado", verbose_name = "Codigo del estado" , on_delete=models.CASCADE)
    descripcion_tpH = models.TextField(verbose_name='Descripcion de la habitacion')
    minimoPersonas_tpH = models.IntegerField(verbose_name='Minimo de personas')
    maximoPersonas_tpH = models.IntegerField(verbose_name='Maximo de personas')
    image_tpH = models.ImageField(upload_to='media')