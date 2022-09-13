from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import GallerySerializer
from .models import Image
from .caption_service import CaptionService
from rest_framework import status
from rest_framework.response import Response

# Create your views here.
class GalleryView(viewsets.ModelViewSet):
    serializer_class = GallerySerializer
    queryset = Image.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Override create method and generate caption based on image(s) data
        placing caption on request object beforing continuing to super
        """ 

        # TODO: validate payload somewhere, read up on where makes most sense in django

        request = CaptionService(self.request).generate_caption()
        return super().create(request, *args, **kwargs)