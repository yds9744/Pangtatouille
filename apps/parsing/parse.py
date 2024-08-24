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
        raise ValueError("입력 문자열에서 숫자와 단위를 찾을 수 없습니다.")

directory = 'data/input'
for dirpath, _, filenames in os.walk(directory):
    for filename in filenames:
        with open('data/input/'+filename, 'r') as input_file:
            with open('data/output/'+filename, 'a') as output_file:
                reader = csv.reader(input_file, delimiter=',')
                writer = csv.writer(output_file)
                writer.writerow(next(reader) + ["quantity", "unit"])
                for row in reader:
                    name = row[0]
                    split_text = name.split(', ')
                    if len(split_text) > 1:
                        quantity_unit = split_text[1]
                        quantity, unit = split_quantity_unit(quantity_unit)
                        writer.writerow(row + [quantity, unit])
