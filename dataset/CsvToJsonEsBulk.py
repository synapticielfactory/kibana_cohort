import csv
import json

csvfile = open('food_relay.csv', 'r')
jsonfile = open('food_relay_es_bulk.csv.json', 'w')

fieldnames = ("order_id", "order_date", "user_id", "total_charges", "common_id", "pup_id", "pickup_date", "first_order_date", "dayUntilReturn")
reader = csv.DictReader(csvfile, fieldnames, dialect='excel')
for row in reader:
    #write the first line of _bulk to index the document
    jsonfile.write('{"index": {"_index": "food_relay", "_id": ' + row["order_id"] + '}}\n')
    #write the second line representing the document payload to be indexed.
    json.dump(row, jsonfile)
    jsonfile.write('\n')