from django.db import models

# Create your models here.
class Image(models.Model):
    caption = models.TextField()

    file = models.ImageField()

    def _str_(self):
        return self.caption