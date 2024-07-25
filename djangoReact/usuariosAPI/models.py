from django.db import models

# Create your models here.

class tb_rol(models.Model): 
    codigo_rl = models.AutoField(primary_key=True, verbose_name="Codigo del rol")
    tipo_rl = models.CharField(max_length=50, verbose_name="Tipo de rol")
    
    def __str__(self):
        return f'{self.codigo_rl} = {self.tipo_rl}'
    
class tb_tpDocumento(models.Model):
    codigo_tpD = models.AutoField(primary_key=True, verbose_name="Codigo del tipo de documento")
    tipo_tpDD = models.CharField(max_length=60,verbose_name="Tipo de documento")
    abreviatura_tpD = models.CharField(max_length=50, verbose_name="Abreviatura del tipo de documento")
    
    def __str__(self):
        return f'{self.codigo_tpD} = {self.tipo_tpDD}'

        
class tb_usuarios(models.Model):
    numeroDocumento_usu = models.CharField(primary_key = True,max_length=11, default="", verbose_name="Numero de Documento") 
    correoElectronico_usu = models.EmailField(max_length=254, default="", verbose_name="Correo Electronico")
    nombres_usu = models.CharField(max_length=50, default="", verbose_name="Nombres Del usuario")
    apellidos_usu = models.CharField(max_length=50,default="", verbose_name="Apellidos del usuario")
    contrasena_usu = models.CharField(max_length=50, default="", verbose_name="Contraseña del usuario")
    codigo_tpD = models.ForeignKey(tb_tpDocumento, default=1, verbose_name="Codigo del tipo de documento", on_delete=models.CASCADE)
    codigo_rl = models.ForeignKey(tb_rol,default=1, verbose_name="Codigo de rol", on_delete=models.CASCADE)    