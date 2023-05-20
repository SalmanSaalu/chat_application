from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class TokenSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Token
        fields=['key','user']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username']


from .models import Message,OnlineUsers

class MessageSerializer(serializers.ModelSerializer):
       sender_username=serializers.CharField(source='sender.username',read_only=True)
       reciever_username=serializers.CharField(source='reciever.username',read_only=True)
       class Meta:
           model = Message
           fields = ('id', 'sender', 'reciever', 'content','sender_username','reciever_username')
           

class OnlineSerializer(serializers.ModelSerializer):
       online_username=serializers.CharField(source='online.username',read_only=True)
       class Meta:
            model=OnlineUsers
            fields=('id','online','online_username')


