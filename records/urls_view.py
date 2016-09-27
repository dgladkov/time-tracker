from django.conf.urls import url
from . import views


urlpatterns = [
    url('records/$', views.records_view, name='records_view'),
    url('^$', views.index, name='index'),
    ]