# Generated by Django 4.2.6 on 2023-12-09 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facturasAPI', '0002_alter_tb_factura_fechaemision_fac'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tb_factura',
            name='codigo_fac',
            field=models.AutoField(primary_key=True, serialize=False, verbose_name='Codigo de la factura'),
        ),
    ]
