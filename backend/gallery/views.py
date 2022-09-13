from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import GallerySerializer
from .models import Image
from .caption_service import CaptionService
from rest_framework import status
from rest_framework.response import Response
from io import BytesIO
from django.core.files.base import ContentFile

# Create your views here.
class GalleryView(viewsets.ModelViewSet):
    serializer_class = GallerySerializer
    queryset = Image.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Override create method and generate captions for passed image(s) data
        and continue to save, returning updated list of all Images
        """ 

        # TODO: validate payload on entry and exit, read up on where makes most sense in django

        files = self.request.FILES.getlist('file')
        for f in files:
            img_data: bytes = BytesIO(f.read())
            caption: str = CaptionService().classify_img(img_data)
            Image.objects.create(file=f, caption=caption)

        images = Image.objects.all()
        serializer = GallerySerializer(images, many=True)
        return Response(serializer.data)