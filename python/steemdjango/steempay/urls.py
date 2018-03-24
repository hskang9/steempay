from django.conf.urls import url
from steempay import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view()),
    url(r'^submit$', views.submit)
]