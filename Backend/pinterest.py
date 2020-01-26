from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

def getPinterestInfo(query):
    query = query.strip().replace(" ", "+")
    query = 'https://www.bing.com/images/search?q=site:pinterest.com+' + query + "+diy+art"

    # open the page and store it
    my_url =  query
    uClient = uReq(my_url)
    page_html = uClient.read()
    uClient.close()
    page_soup = soup(page_html, "html.parser")

    body_page = page_soup.find("div", {"id":"b_content"})
    results = body_page.findAll("div", {"class":"item"})
    images = []
    titles = []
    links = []
    for result in results:
        temp = result.find("div", {"class":"meta"})
        links.append(temp.a['href'])
        titles.append(temp.div.text)
        images.append(result.a['href'])
    # print(images)
    # print(titles)
    # print(links)

    json = []
    for i in range(len(images)):
        tempDict = {}
        tempDict["title"] = titles[i]
        tempDict["thumbnail"] = images[i]
        tempDict['link'] = links[i]
        json.append(tempDict)
    return json


