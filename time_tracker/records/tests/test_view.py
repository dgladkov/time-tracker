from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

User = get_user_model()


class TestRecordCRUD(APITestCase):
    def setUp(self):
        self.data = {}