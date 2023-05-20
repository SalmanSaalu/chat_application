import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from .models import Message,OnlineUsers
from django.contrib.auth.models import User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user=self.scope["user"]
        if user.is_authenticated:

            message_obj = await self.online_users(user)       
            self.room_group_name = 'chatapp'
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        user=self.scope["user"]
        message_obj = await self.disconnecting_user_online(user)  
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )



    @database_sync_to_async
    def online_users(self,user):
        userGet=User.objects.get(username=user)    
        if OnlineUsers.objects.filter(online=userGet).exists():
            return 'already there'
        else:
            online=OnlineUsers.objects.create(online=userGet)
            return online
            
    @database_sync_to_async
    def disconnecting_user_online(self,user):
        userGet=User.objects.get(username=user)   
        if OnlineUsers.objects.filter(online=userGet).exists():
           OnlineUsers.objects.filter(online=userGet).delete()
           return 'deleted'
        else:
            return 'not data to delete'


    @database_sync_to_async
    def create_message(self, message, sender,reciever):
        sending=User.objects.get(username=sender)
        recieving=User.objects.get(username=reciever)
        message_obj = Message.objects.create(
            content=message,
            sender=sending,
            reciever=recieving
        )
        
        return message_obj

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender = data['sender']
        reciever=data['reciever']

        # Create a new message object and save it to the database
        message_obj = await self.create_message(message,sender,reciever)

        # Send the message to the group
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_obj.content,
                'sender': message_obj.sender,
                'reciever':message_obj.reciever,
                'timestamp': str(message_obj.timestamp)
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender=event['sender']
        reciever=event['reciever']
        timestamp = event['timestamp']
        

        # Send the message to the websocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender.username,
            'reciever':reciever.username,
            'timestamp': timestamp
        }))

    
