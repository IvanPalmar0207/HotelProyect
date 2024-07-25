# Generated by Django 4.2.6 on 2023-12-07 19:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('habitacionesAPI', '0002_alter_tb_mobiliario_codigo_pmb_and_more'),
        ('reservasAPI', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tb_reserva',
            name='codigo_hab',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='habitacionesAPI.tb_habitacion', verbose_name='Codigo de la habitacion'),
        ),
    ]
