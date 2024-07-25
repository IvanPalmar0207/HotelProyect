# Generated by Django 4.2.7 on 2023-12-03 19:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('reservasAPI', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='tb_categoria',
            fields=[
                ('codigo_cat', models.AutoField(default=1, primary_key=True, serialize=False, verbose_name='Codigo de la categoria')),
                ('nombre_cat', models.CharField(max_length=70, verbose_name='Nombre de la categoria')),
                ('descripcion_cat', models.TextField(verbose_name='Descripcion de la categoria')),
                ('imagen_cat', models.ImageField(upload_to=None, verbose_name='Imagen de la categoria')),
            ],
        ),
        migrations.CreateModel(
            name='tb_servicio',
            fields=[
                ('codigo_ser', models.AutoField(primary_key=True, serialize=False, verbose_name='Codigo del servicio')),
                ('nombre_ser', models.CharField(max_length=70, verbose_name='Nombre del servicio o producto')),
                ('descripcion_ser', models.TextField(verbose_name='Descripcion del servicio')),
                ('imagen_ser', models.ImageField(upload_to=None, verbose_name='Imagen del servicio')),
                ('codigo_cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviciosAPI.tb_categoria', verbose_name='Categoria del servicio')),
            ],
        ),
        migrations.CreateModel(
            name='tb_consumo',
            fields=[
                ('numero_con', models.AutoField(primary_key=True, serialize=False, verbose_name='Codigo del consumo')),
                ('fecha_con', models.DateTimeField(verbose_name='Fecha del consumo')),
                ('cantidad_con', models.IntegerField(verbose_name='Cantidad consumida')),
                ('precioUnitario_con', models.FloatField(verbose_name='Precio unitario del producto')),
                ('codigo_res', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reservasAPI.tb_reserva', verbose_name='Numero de la reserva')),
                ('codigo_ser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviciosAPI.tb_servicio', verbose_name='Codigo del servicio consumido')),
            ],
        ),
    ]
