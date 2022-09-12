from django.contrib import admin
from .models import Image

class GalleryAdmin(admin.ModelAdmin):
    list_display = ('id', 'caption')

# Register your models here.

admin.site.register(Image, GalleryAdmin)