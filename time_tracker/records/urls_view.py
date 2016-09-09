from django.conf.urls import url
from . import views


urlpatterns = [
    url('^$', views.records_view, name='records_view'),
    ]