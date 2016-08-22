from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from registration.tests.factories import UserFactory

User = get_user_model()


class TestRecordCRUD(APITestCase):
    def setUp(self):
        self.data = {
            'time_spent': 1.1,
            'date': timezone.now(),            
        }
        self.user = UserFactory()
        # auth
        token = Token.objects.get(user__username=self.user.username)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        
    def test_create_record(self):
        resp = self.client(reverse('records'), self.data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED, msg=str(resp.content))