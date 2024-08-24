import requests
import re
from bs4 import BeautifulSoup
from urllib import parse
import json
import csv


# category를 다 가져오자
init_url = "https://www.coupang.com/np/categories/464568"
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3"}
res = requests.get(init_url, headers=headers)
html = res.text
soup = BeautifulSoup(html, "html.parser")
title = soup.select_one(".newcx-product-list-title").get_text(strip=True)
title = "국내산_" + title.replace("/","_")
items = soup.select("li.baby-product")
itemList = []
# 먼저 category id를 쭉 가져와야 한다.

for item in items:
    # productId를 가져온다.
    productId = item.attrs.get("id")
    image = "https:"+str(item.select_one("img").attrs.get("src"))
    descriptions = item.select_one(".descriptions")
    name = descriptions.select_one(".name").get_text(strip=True)
    discount_rate = ""
    base_price = ""
    price = ""
    unit_price_text = ""
    arrival_info = ""
    free_shopping = ""
    rating_total_cnt = ""
    reward_cash = ""
    
    if(descriptions.select_one(".discount-percentage")):
        discount_rate = descriptions.select_one(".discount-percentage").get_text(strip=True)[:-1]
    if(descriptions.select_one(".base-price")):
        base_price = descriptions.select_one(".base-price").get_text(strip=True)
    if(descriptions.select_one(".price-value")):
        price = descriptions.select_one(".price-value").get_text(strip=True)
    if(descriptions.select_one(".unit-price")):
        unit_price_text = descriptions.select_one(".unit-price").get_text(strip=True)
    if(descriptions.select_one(".arrival-info")):
        arrival_info = descriptions.select_one(".arrival-info").get_text(strip=True)
    if(descriptions.select_one(".rating-total-count")):
        rating_total_cnt = descriptions.select_one(".rating-total-count").get_text(strip=True)[1:-1]
    if(descriptions.select_one(".reward-cash-txt")):
        reward_cash = descriptions.select_one(".reward-cash-txt").get_text(strip=True)[3:-4]
    price = price.replace(",","")
    base_price = base_price.replace(",","")
    rating_total_cnt = rating_total_cnt.replace(",","")
    reward_cash = reward_cash.replace(",","")
    itemDic = [
    name,
    discount_rate,
    base_price,
    price,
    unit_price_text,
    arrival_info,
    rating_total_cnt,
    reward_cash,
    image,
    ]
    
    
    itemList.append(itemDic)
with open(title + ".csv", "w") as file:
    writer = csv.writer(file)
    kind = ["name","discount_rate","base_price","price", "unit_price_text","arrival_info","rating_total_cnt","reward_cash","image_url"]
    writer.writerow(kind)
    for i in itemList:
        writer.writerow(i)
   