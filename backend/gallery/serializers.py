from rest_framework import serializers
from .models import Image

from .caption_service import CaptionService

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'caption', 'file')