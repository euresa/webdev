# Generated by Django 3.2.7 on 2021-09-09 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_todo_timecreated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='timeCreated',
        ),
        migrations.AddField(
            model_name='todo',
            name='serialCode',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
