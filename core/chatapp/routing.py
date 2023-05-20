from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from chatapp.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'chatapp/', ChatConsumer.as_asgi()),
]