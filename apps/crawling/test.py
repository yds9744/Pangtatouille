import requests
import re
from bs4 import BeautifulSoup
from urllib import parse
import json
import csv


url_init = 'https://www.coupang.com/np/search?component=&q='

keyword = "닭가슴살"
url = url_init+keyword
url = parse.urlparse(url)
query = parse.parse_qs(url.query)
result = parse.urlencode(query, doseq=True)
result = result[2:]
url = url_init + result + "&channel=user"
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3"}
res = requests.get(url, headers=headers)
html = res.text
soup = BeautifulSoup(html, "html.parser")
items = soup.select("[class=search-product]")

# print(items[0])
# productid ㅊ

itemList = []
for item in items:
    data =  json.loads(item.select_one("[class=search-product-link]").attrs.get('data-srp-log'))
    productId = data["productId"]
    name = item.select_one(".name").text
    dc_percent = ""
    if(item.select_one(".instant-discount-rate")):
        dc_percent = item.select_one(".instant-discount-rate").text
    
    price = ""
    if(item.select_one(".base-price")):
        price = item.select_one(".base-price").text
    dc_price = item.select_one(".price-value").text
    unit_price = ""
    delivery_time = ""
    review = ""
    reward_text = ""
    point = ""
    delivery_price = ""
    
    if(item.select_one(".unit-price")):
        unit_price = item.select_one(".unit-price").text
    if(item.select_one(".arrival-info")):
        delivery_time = item.select_one(".arrival-info").text
    if(item.select_one(".rating-total-count")):
        review = item.select_one(".rating-total-count").text
    if(item.select_one(".reward-cash-txt")):
        reward_text = item.select_one(".reward-cash-txt").text
    if(reward_text != ""):
        reward = reward_text[3:-4]
    if(item.select_one('.badge-delivery')):
        delivery_price = item.select_one('.badge-delivery').text
    image = ""
    if(item.select_one(".search-product-wrap-img").attrs.get('data-img-src')):
        image = "https:" + str(item.select_one(".search-product-wrap-img").attrs.get('data-img-src'))
    else:
        image = "https:" + str(item.select_one(".search-product-wrap-img").attrs.get('src'))
    
    item_dic = {
        "productId": productId,
        "name": name,
        "dc_percent": dc_percent,
        "price": price,
        "dc_price": dc_price,
        "unit_price": unit_price,
        "delivery_time": delivery_time,
        "delivery_price": delivery_price,
        "review":review,
        "point":point,
        "image":image
    }
    itemList.append(item_dic)


filename = keyword+".csv"

with open(filename, "w") as file:
    writer = csv.writer(file)
    writer.writerow(itemList)