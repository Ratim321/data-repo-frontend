from rest_framework import serializers
from .models import Dataset

class DatasetSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.username', read_only=True)
    file = serializers.FileField(required=True)

    class Meta:
        model = Dataset
        fields = ['id', 'title', 'description', 'file', 'created_at', 'updated_at', 'owner']
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner'] 