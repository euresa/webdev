# Generated by Django 3.2.7 on 2021-09-09 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_auto_20210909_0031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='serialCode',
        ),
        migrations.AddField(
            model_name='todo',
            name='registeredInDatabase',
            field=models.BooleanField(default=1),
            preserve_default=False,
        ),
    ]
