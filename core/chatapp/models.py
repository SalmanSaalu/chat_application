from django.db import models
from django.contrib.auth.models import User,AnonymousUser
from django.db.models import SET

from django.db import models

class Message(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE,related_name='senderMessage')
    reciever= models.ForeignKey(User,on_delete=models.CASCADE,related_name='recieverMessage')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) :
        return f'{self.sender} {self.reciever}{self.content}{self.timestamp}'
       

class OnlineUsers(models.Model):
    online = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self) :
        return f'{self.online} '