# -*- coding: utf-8 -*-

import tensorflow as tf
from tensorflow.keras.models import load_model
import tensorflow_text
import zipfile

import sys
zip_path = '../AI/my_model_ver2.zip'
dest_path = '../AI/'
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(dest_path)
model_path = '../AI/first_model'

model = load_model(model_path,compile=False)

paragraphs = sys.argv[1]

def predict(paragraphs):

    # 문자열로 변환
    paragraphs_str = ' '.join(paragraphs)

    # 모델 입력 형태로 변환
    input_data = tf.constant([paragraphs_str])

    # 예측
    prediction = model.predict(input_data)

    res = 'nc' if prediction[0] >=0.5 else 'c'
    percentage = tf.sigmoid(prediction[0][0])


    if res=='nc':
        print(f'신뢰도 {percentage*100}%로, 낚시성 기사가 아닙니다')
    else:
        print(f'신뢰도{percentage*100}%로, 낚시성 기사입니다')




predict(paragraphs)
