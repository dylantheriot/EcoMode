from bs4 import BeautifulSoup as bs
import requests


def getYtInfo(itemDetected):

    URL = "https://www.youtube.com/results?search_query=recycling+" + itemDetected + "+ideas"

    response = requests.get(URL)
    page = response.text

    soup = bs(page, 'html.parser')

    videos = soup.findAll('a', class_ = "yt-uix-tile-link")

    for v in videos:
        href = v.get("href")
        title = v.get("title")
        link = "https://www.youtube.com" + href
        print(title)
        print(link)

getYtInfo("Can")