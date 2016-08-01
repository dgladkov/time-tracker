from django.contrib.auth import get_user_model
from django.utils.translation import ugettext as _

from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as authtoken_view
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .serializers import UserSerializer

User = get_user_model()


class Users(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer