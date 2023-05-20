from django.urls import path
from . import views


urlpatterns=[
    path('login/',views.login,name='login'),
    
    path('allusers/',views.allusers,name='allusers'),

    path('mainchat/<str:pk>/',views.mainchat,name='mainchat'),
    path('chatlist/',views.chatlist,name='chatlist'),
    path('onlineuser/',views.onlineuser,name='onlineuser')

]