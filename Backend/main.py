from flask import Flask
from flask import jsonify
from pinterest import getPinterestInfo
from youtube import getYtInfo
from location import getLocInfo
from flask import request
import os
import errors
import requests
import base64

app = Flask(__name__)

@app.route("/")
def home():
    return('Howdy and welcome to the API for Eco-Mode! Please enjoy your stay.')

@app.route("/pinterest")
def pinterest():
    query = request.args.get('q')
    list = getPinterestInfo(query)
    return jsonify(results = list)

@app.route("/youtube")
def youtube():
    query = request.args.get('q')
    list = getYtInfo(query)
    return jsonify(results = list)
    
@app.route("/location")
def location():
    query = request.args.get('q')
    list = getLocInfo(query)
    return jsonify(results = list)

@app.route("/identify", methods=['POST'])
def identify():
    if os.getenv('AZURE_CV_KEY') is None:
        raise errors.InternalError('The actual monkeys on the dev team didn\'t set an API key')

    api_key = os.getenv('AZURE_CV_KEY')
    endpoint = 'https://ecomode.cognitiveservices.azure.com/vision/v2.1/analyze'

    img_bytes = base64.b64decode(request.data)
    headers = {
        'Ocp-Apim-Subscription-Key': api_key,
        'Content-Type': 'application/octet-stream'
    }
    params = {'visualFeatures': 'Categories,Description,Color'}
    response = requests.post(endpoint, headers=headers, params=params, data=img_bytes)
    response.raise_for_status()
    analysis = response.json()
    return analysis


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
