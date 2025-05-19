from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Dataset
from .serializers import DatasetSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

class DatasetListView(generics.ListAPIView):
    queryset = Dataset.objects.all().order_by('-created_at')
    serializer_class = DatasetSerializer
    permission_classes = [permissions.AllowAny]

class DatasetDetailView(generics.RetrieveAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    permission_classes = [permissions.AllowAny]

class DatasetCreateView(generics.CreateAPIView):
    serializer_class = DatasetSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)  # Allow file uploads

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
