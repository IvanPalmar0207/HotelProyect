# Generated by Django 4.2.7 on 2024-04-14 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuariosAPI', '0004_remove_tb_usuarios_contrasena_usu_tb_usuarios_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tb_usuarios',
            name='contrasena_usu',
            field=models.CharField(default='Contraseña del usuario', max_length=50, verbose_name='Contraseña del usuario'),
        ),
        migrations.AlterField(
            model_name='tb_usuarios',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]