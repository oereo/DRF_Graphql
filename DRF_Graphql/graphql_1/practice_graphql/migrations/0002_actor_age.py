# Generated by Django 3.1.2 on 2020-10-27 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice_graphql', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='actor',
            name='age',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]