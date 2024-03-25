from django.shortcuts import render
from api.models import User, Profile, ChatMessage
from api.serializers import UserSerializer, ProfileSerializer,MyTokenObtainPairSerializer, RegisterSerializer, MessageSerializer
from django.db.models import Subquery, OuterRef, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class= MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    permission_classes = [(AllowAny)]
    serializer_class= RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

class MyInbox(generics.ListAPIView):
    serializer_class=MessageSerializer

    def get_queryset(self):
        user_id=self.kwargs['user_id']
        messages=ChatMessage.objects.filter(
            id__in= Subquery(
                User.objects.filter(
                    Q(sender__receiver=user_id)|
                    Q(receiver__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'), receiver=user_id)|           
                            Q(receiver=OuterRef('id'), sender=user_id)
                        ).order_by("-id")[:1].values_list("id",flat=True)
                    )
                ).values_list("last_msg", flat=True).order_by("-id")
            )
        ).order_by("-id")
        return messages
    

class GetMessages(generics.ListAPIView):
    serializer_class=ChatMessage
    
    def get_queryset(self):
        sender_id= self.kwargs['sender_id']
        receiver_id= self.kwargs['receiver_id']
        messages = ChatMessage.objects.filter(
            sender__in=[sender_id, receiver_id],
            receiver_id=[sender_id, receiver_id]
        )
        return messages
    
class SendMessage(generics.CreateAPIView):
    serializer_class=MessageSerializer

class ProfileDetail(generics.RetrieveAPIView):
    serializer_class=ProfileSerializer
    queryset= Profile.objects.all()
    permission_classes=[IsAuthenticated]

class SearchUser(generics.ListAPIView):
    serializer_class=ProfileSerializer
    queryset=Profile.objects.all()
    permission_classes=[IsAuthenticated]

    def list(self, req, *args, **kwargs):
        username= kwargs['username']
        logged_in_user=self.request.user
        users = Profile.objects.filter(
            Q(user__username__icontains=username) |
            Q(full_name__icontains=username) |
            Q(user__email__icontains=username) &
            ~Q(user=logged_in_user)
        )
        if not users.exists():
            return Response({
                "detail":"No users found"
            }, status=status.HTTP_404_NOT_FOUND)
        serializer=self.get_serializer(users,many=True)
        return Response(serializer.data)
