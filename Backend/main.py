from flask import Flask
from flask import jsonify
from bs4 import BeautifulSoup as bs
# from pinterest import getPinterestInfo
# from youtube import getYtInfo
# from location import getLocInfo
from flask import request
import requests

def getYtInfo(itemDetected):

    URL = "https://www.youtube.com/results?search_query=recycling+" + itemDetected + "+ideas"

    response = requests.get(URL)
    page = response.text

    soup = bs(page, 'html.parser')

    videos = soup.findAll('a', class_ = "yt-uix-tile-link")

    titles = []
    links = []
    thumbnails = []

    for v in videos:
        href = v.get("href")
        thumb = href[9:]
        titles.append(v.get("title"))
        links.append("https://www.youtube.com" + href)
        thumbnails.append("https://i.ytimg.com/vi/"+ thumb + "/0.jpg")


    jsonOut = []

    for i in range(len(titles)):
        temp = {}
        temp['title'] = titles[i]
        temp['link'] = links[i]
        temp['thumbnail'] = thumbnails[i]
        jsonOut.append(temp)

    return jsonOut


app = Flask(__name__)

@app.route("/")
def home():
    return('Howdy and welcome to the API for Eco-Mode! Please enjoy your stay.')

# @app.route("/pinterest")
# def pinterest():
#     query = request.args.get('q')
#     list = getPinterestInfo(query)
#     return jsonify(results = list)

@app.route("/youtube")
def youtube():
    query = request.args.get('q')
    list = getYtInfo(query)
    return jsonify(results = list)
    
# @app.route("/location")
# def location():
#     query = request.args.get('q')
#     list = getLocInfo(query)
#     return jsonify(results = list)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)