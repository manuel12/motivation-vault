import json
from django.core import serializers 

def make_backup(queryset):
    print(queryset)

    for q in queryset:
        if hasattr(q, 'author'):                print(q.author)
        if hasattr(q, 'book'):                  print(q.book)
        if hasattr(q, 'description'):           print(q.description)
        if hasattr(q, 'id'):                    print(q.id)
        #if hasattr(q, 'motivationalspeeches'):  print(q.motivationalspeeches)
        if hasattr(q, 'pk'):                    print(q.pk)
        if hasattr(q, 'podcast'):               print(q.podcast)
        if hasattr(q, 'title'):                 print(q.title)



    data = serializers.serialize('json', queryset)
    # print(data)

    try:
      with open('backup.json', 'w') as backup_file:
        backup_file.write(data)
    except:
    #   print('Backup could not be saved!')
      return False

    # print('Backup saved!')
    return data #json_serialized


def fetch_backup_data(backup_file='backup.json'):
    with open('backup.json', 'r') as backup_file:
      json_backup = json.load(backup_file)

      resources = []
      for obj in json_backup:
        fields = obj['fields']
        description = ''.join(e for e in fields['description'] if e.isalnum() or e in ['.', ',',' '])
        resource = {
          'title': fields['title'],
          'author': fields['author'],
          'description': description
        }
        resources.append(resource)
      return resources
        