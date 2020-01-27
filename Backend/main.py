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

recycle = {
    'newspaper': 1, 
    'magazines' : 1, 
    'cans' : 1, 
    'can' : 1, 
    'magazine' : 1, 
    'paper' : 1, 
    'plastic' : 1, 
    'book' : 1, 
    'box' : 1, 
    'boxes' : 1, 
    'bottle' : 1,
    'aluminum' : 1, 
    'bottles' : 1, 
    'mail' : 1, 
    'bags' : 1,
    'straws' : 1, 
    'bag' : 1, 
    'straw' : 1, 
}

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

    img_bytes = bytes(base64.b64decode(request.data))
    headers = {
        'Ocp-Apim-Subscription-Key': api_key,
        'Content-Type': 'application/octet-stream'
    }
    params = {'visualFeatures': 'Categories,Description,Color'}
    response = requests.post(endpoint, headers=headers, params=params, data=img_bytes)
    response.raise_for_status()
    analysis = response.json()
    return analysis

@app.route("/recycle") 
def recycle1(): 
    query = request.args.get('q') 
    list = [] 
    tempDict = {} 
    if query in recycle.keys(): 
        tempDict['value'] = 'Recycle' 
    else: 
        tempDict['value'] = 'Trash' 
    list.append(tempDict) 
    return jsonify(results = list)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
