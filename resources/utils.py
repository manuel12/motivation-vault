import json

def read_from_json(file):
    with open(file) as f:
      data = json.load(f)
    return data

def get_model_data(key):
  data = read_from_json("resources/model-data.json")
  return data[key]