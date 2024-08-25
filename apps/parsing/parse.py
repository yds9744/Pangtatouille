import csv
import re
import os

def split_amount_unit(input_string):
    # 정규식을 사용하여 숫자와 단위를 분리합니다.
    # [a-zA-Z가-힣]+ 부분이 영문 및 한글 단위를 포함하도록 설정합니다.
    match = re.match(r"([0-9.]+)([a-zA-Z가-힣]+)", input_string)
    if match:
        amount = float(match.group(1))  # 숫자 부분
        unit = match.group(2)  # 단위 부분
        return amount, unit
    else:
        return None, None

# kg, l to g, ml
# 1kg = 1000g, 1l = 1000ml
def convert_unit(amount, unit):
    unit = unit.lower()
    if unit == 'kg':
        return amount * 1000, 'g'
    elif unit == 'l':
        return amount * 1000, 'ml'
    else:
        return amount, unit

exception_list = ['청정원 허브맛 솔트 마늘 & 양파, 1개, 52g', '청정원 카레여왕 구운마늘&양파, 108g, 1개', '잘식비 양파 크림 소스, 200g, 1개', '바담바담 순살 간장 새우장 (냉동), 1개, 200g', '셰프의장 최인선 셰프의 간장 순살꽃게장 (냉동), 250g, 1통', '이금선명인 순살 간장 꽃게장 (냉동), 250g, 1개', '최인선 셰프의 함초품은 간장 깐새우장 (냉동), 350g, 1통', '맥 조선 간장 생청국장, 160g, 3개', '맥 조선 간장 생청국장, 160g, 3개', '모두의 집밥 간장 누드새우장, 1개, 500g', '사비니타르투피 트러플 소금, 30g, 1개']
directory = 'data/input'
for dirpath, _, filenames in os.walk(directory):
    with open('data/output/result.csv', 'a') as output_file:
        writer = csv.writer(output_file)
        writer.writerow(["name", "discount_rate", "base_price", "price", "unit_price_text", "arrival_info", "rating_total_cnt", "reward_cash", "image_url", "amount", "amount_unit", "quantity", "quantity_unit", "category"])
        for filename in filenames:
            with open('data/input/'+filename, 'r') as input_file:
                    reader = csv.reader(input_file, delimiter=',')
                    for row in reader:
                        name = row[0]
                        split_text = name.split(', ')
                        if len(split_text) > 2:
                            amount_unit = split_text[1]
                            amount, amount_unit = split_amount_unit(amount_unit)
                            quantity_unit = split_text[2]
                            quantity, quantity_unit = split_amount_unit(quantity_unit)
                            new_row = row
                            if amount is not None:
                                if quantity is not None:
                                    if name not in exception_list:
                                        amount, amount_unit = convert_unit(amount, amount_unit)
                                        quantity, quantity_unit = convert_unit(quantity, quantity_unit)
                                        filename = filename.split('.')[0]
                                        category = filename.replace('_', ' ')
                                        if '국내산' in category:
                                            category += ' 돼지고기'
                                        if '페페로치노' in name:
                                            category = '페페로치노'
                                        writer.writerow(row + [amount, amount_unit, quantity, quantity_unit, category])
