import json


def read_from_json(file):
    with open(file) as f:
        data = json.load(f)
    return data


def get_default_data():
    data = read_from_json("resources/default-data.json")
    return data
