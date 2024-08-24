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

exception_list = ['kg', 'l']
directory = 'data/input'
for dirpath, _, filenames in os.walk(directory):
    with open('data/output/result.csv', 'a') as output_file:
        writer = csv.writer(output_file)
        writer.writerow(["name", "discount_rate", "base_price", "price", "unit_price_text", "arrival_info", "rating_total_cnt", "reward_cash", "image_url", "amount", "amount_unit", "quantity", "quantity_unit"])
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
                                    amount, amount_unit = convert_unit(amount, amount_unit)
                                    quantity, quantity_unit = convert_unit(quantity, quantity_unit)
                                    writer.writerow(row + [amount, amount_unit, quantity, quantity_unit])
