from django.contrib import admin
from .models import Message,OnlineUsers
# Register your models here.
class MessageModel(admin.ModelAdmin):
    list_display = ("sender", "reciever", "content",'timestamp')

admin.site.register(Message, MessageModel)


class OnlineModel(admin.ModelAdmin):
    list_display = ("id","online")

admin.site.register(OnlineUsers,OnlineModel)