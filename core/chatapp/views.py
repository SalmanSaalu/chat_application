from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Q
import json
from django.contrib.auth.models import User
from .products import products
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer,TokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .models import Message,OnlineUsers
from .serializers import MessageSerializer,OnlineSerializer

from django.core import serializers

# Create your views here.
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def login(request):
    received_json_data=json.loads(request.body)  
    username=received_json_data['username']  
    c=User.objects.get(username=username)
    user=Token.objects.get(user=c)
    # username=request.user.username
    # user = Token.objects.get(key=request.auth.key)
    serializer={
        'key':user.key,
        'username':username
    }
    return Response(serializer)

@api_view(['GET'])
def allusers(request):
    
    a=User.objects.all()
    serializer=UserSerializer(a,many=True)
    return Response(serializer.data)



# from here

#require user token(authentication)and id of the clicked chat user(chat top bar_name)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mainchat(request,pk):
    # print(request.auth.key)
    userObject=request.auth.key
    sender=Token.objects.get(key=userObject).user
    reciever=User.objects.get(id=pk)
    if Message.objects.filter(Q(sender=sender,reciever=reciever)|Q(sender=reciever,reciever=sender)).exists():
        messageContent=Message.objects.filter(Q(sender=sender,reciever=reciever)|Q(sender=reciever,reciever=sender)).order_by("timestamp")
        serializer=MessageSerializer(messageContent,many=True)      
        return Response(serializer.data)
    
    else:
        serializer=[{
            'sender_username':sender.username,
            'reciever_username':reciever.username,
            'content':'start messaging now'
        }]

        return Response(serializer)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chatlist(request):
    userObject=request.auth.key
    sender=Token.objects.get(key=userObject).user
    if Message.objects.filter(Q(sender=sender)|Q(reciever=sender)).exists():
        a=Message.objects.filter(Q(sender=sender)|Q(reciever=sender))
        # print(a)
        # b=a.values_list('reciever', flat=True).values_list('reciever', flat=True).distinct()
        recievers=[]
        for i in a:
            
            if i.sender not in recievers:
                recievers.append(i.sender)
            if i.reciever not in recievers:
                recievers.append(i.reciever)
        print(recievers)
        recievers.remove(sender)
        
        TotalRecieverObject=[]
        for i in recievers:
            obj=User.objects.get(username=i)
            TotalRecieverObject.append(obj)

        arrayForDetails=[]
        for u in TotalRecieverObject:
            LastMessageDetails=Message.objects.filter(Q(sender=sender,reciever=u)|Q(sender=u,reciever=sender)).order_by("-timestamp")
            arrayForDetails.append(LastMessageDetails[0])
     
        serializer=MessageSerializer(arrayForDetails,many=True)
        # print(a.data)
        # print(json.dumps(arrayForDetails))
        return Response(serializer.data)
    
    else:
        serializer=[{
            'sender_username':'none',
            'reciever_username':'none'
        }]

        return Response(serializer)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def onlineuser(request):
    users=OnlineUsers.objects.all()
    serializer=OnlineSerializer(users,many=True)
    return Response(serializer.data)