from bs4 import BeautifulSoup as soup
import requests

def getLocInfo(itemDetected):

    URL = "https://search.earth911.com/?what=" + itemDetected + "&where=77840&list_filter=all&max_distance=25&family_id=&latitude=&longitude=&country=&province=&city=&sponsor="

    response = requests.get(URL)
    page = response.text

    soup1 = soup(page, 'html.parser')
    locations = soup1.findAll('li', class_ = "result-item")

    titles = []
    address = []


    for l in locations:
        titles.append((l.find('a').text).encode("ascii", "ignore").decode("utf8"))
        address1 = (l.find('p', class_ = "address1")).text
        address2 = (l.find('p', class_ = "address2")).text
        address3 = (l.find('p', class_ = "address3")).text
        finalAddress = address1 + " " + address2 + " " + address3 
        address.append(finalAddress.encode("ascii", "ignore").decode("utf8"))

    jsonOut = []

    for i in range(len(titles)):
        temp = {}
        temp['title'] = titles[i]
        temp['address'] = address[i]
        jsonOut.append(temp)

    return jsonOut
