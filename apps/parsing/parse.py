import csv
import re
import os

def split_quantity_unit(input_string):
    # 정규식을 사용하여 숫자와 단위를 분리합니다.
    # [a-zA-Z가-힣]+ 부분이 영문 및 한글 단위를 포함하도록 설정합니다.
    match = re.match(r"([0-9.]+)([a-zA-Z가-힣]+)", input_string)
    if match:
        quantity = float(match.group(1))  # 숫자 부분
        unit = match.group(2)  # 단위 부분
        return quantity, unit
    else:
        return None, None

directory = 'data/input'
for dirpath, _, filenames in os.walk(directory):
    with open('data/output/result.csv', 'a') as output_file:
        writer = csv.writer(output_file)
        writer.writerow(["name", "discount_rate", "base_price", "price", "unit_price_text", "arrival_info", "rating_total_cnt", "reward_cash", "image_url", "quantity", "unit"])
        for filename in filenames:
            with open('data/input/'+filename, 'r') as input_file:
                    reader = csv.reader(input_file, delimiter=',')
                    for row in reader:
                        name = row[0]
                        split_text = name.split(', ')
                        if len(split_text) > 1:
                            quantity_unit = split_text[1]
                            quantity, unit = split_quantity_unit(quantity_unit)
                            if quantity is not None:
                                writer.writerow(row + [quantity, unit])
