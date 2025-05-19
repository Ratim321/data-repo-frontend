from django.urls import path
from .views import DatasetListView, DatasetDetailView, DatasetCreateView

urlpatterns = [
    path('', DatasetListView.as_view()),
    path('create/', DatasetCreateView.as_view()),
    path('<int:pk>/', DatasetDetailView.as_view()),
] 