from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager as DefaultUserManager
from django.db import models


class UserManager(DefaultUserManager):
    def _create_user(self, username, password, **kwargs):
        user = User.objects.create(username=username, **kwargs)
        user.set_password(password)
        
    def create_user(self, username, password, **kwargs):
        self._create_user(username, password, **kwargs)
    
    def create_superuser(self, username, password, **kwargs):
        self._create_user(username, password, **kwargs)
    

class User(AbstractBaseUser):
    username = models.CharField(max_length=40, blank=False, unique=True)  # TODO: Username unique only in combinations with company
    email = models.EmailField(blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # Django internals 
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    # MANAGERS
    objects = UserManager()
    
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.username
