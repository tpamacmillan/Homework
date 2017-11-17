'''
Timothy Macmillan Data Processing Week 3

This opens the data.csv file, converts it to JSON format
writes the data.json file.
'''

import csv
import json

with open('data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    rows = list(reader)

for row in rows:
	row['temp'] = int(row['temp'])

with open('data.json', 'w') as jsonfile:
    json.dump(rows, jsonfile)