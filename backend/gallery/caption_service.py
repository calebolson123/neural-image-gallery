from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np
from io import BytesIO

# TODO: don't hardcode path to weights, use env vars
resnet_weights_path = '/backend/gallery/resnet50_weights_tf_dim_ordering_tf_kernels.h5'

class CaptionService(object):

    def __init__(self, request):
        self.request = request
        self.model = ResNet50(weights=resnet_weights_path)

    def classify_img(self, img_data):
        '''
        Pulls image(s) out of file property on request, generating a caption
        for each image. The caption(s) are placed back into the request for
        storage downstream
        
        :param img_data: describe about parameter p1
        :return: stringified predicted description/class of image 
        '''
        img = image.load_img(img_data, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        preds = self.model.predict(x)

        # decode the top result into tuple (class, description, probability)
        top_classification = decode_predictions(preds, top=1)[0]
        return str(top_classification[0][1]) # return most confident human-readable class/description

    def generate_caption(self):
        '''
        Pulls image(s) out of file property on request, generating a caption
        for each image. The caption(s) are placed back into the request for
        storage downstream
        
        :return: request containing caption in the 'caption' field of request
        '''
        # print(self.request.FILES.getlist('file'))
        # TODO: probably loop through many images uploaded
        img_file = self.request.FILES['file']
        img_data: bytes = BytesIO(img_file.read())

        caption: str = self.classify_img(img_data)
        self.request.data['caption'] = caption

        return self.request