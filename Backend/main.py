from flask import Flask
from flask import jsonify
from pinterest import getPinterestInfo
from youtube import getYtInfo
from location import getLocInfo
from flask import request

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

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)