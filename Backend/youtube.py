from bs4 import BeautifulSoup as soup
import requests
import json

def getYtInfo(itemDetected):

    URL = "https://www.youtube.com/results?search_query=recycling+" + itemDetected + "+ideas"

    response = requests.get(URL)
    page = response.text

    soup1 = soup(page, 'html.parser')

    videos = soup1.findAll('a', class_ = "yt-uix-tile-link")

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
