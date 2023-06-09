# Generated by Django 4.2.1 on 2023-05-18 07:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chatapp', '0004_remove_message_username_message_reciever_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='reciever',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recieverMessage', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='senderMessage', to=settings.AUTH_USER_MODEL),
        ),
    ]
