from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.test import TestCase
from django.utils import timezone

from registration.tests.factories import UserFactory
from .factories import ProjectFactory
from ..models import Record, Project

User = get_user_model()


class TestRecordCRUD(TestCase):
    def setUp(self):
        self.data = {
            'time_spent': 1.1,
            'date': timezone.now(),
        }
        self.user = UserFactory()
        

    def test_create_record_without_project(self):
        resp = self.client.post(reverse('records_view'), self.data)

    def test_create_record_with_project_when_project_exist(self):
        project = ProjectFactory()
        self.data.update({'project': project.name})
        resp = self.client.post(reverse('records_view'), self.data)