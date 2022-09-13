from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np

from .models import Image

# TODO: don't hardcode path to weights, use env vars
resnet_weights_path = '/backend/gallery/keras/resnet50_weights_tf_dim_ordering_tf_kernels.h5'

class CaptionService(object):

    def __init__(self):
        self.model = ResNet50(weights=resnet_weights_path)

    def classify_img(self, img_data: bytes):
        '''
        Generates a classification/caption for provided image.
        
        :param img_data: bytes of image
        :return: stringified predicted description/class
        '''
        img = image.load_img(img_data, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        preds = self.model.predict(x)

        # decode the top result into tuple (class, description, probability)
        top_classification = decode_predictions(preds, top=1)[0]
        return str(top_classification[0][1]) # return most confident human-readable class/description