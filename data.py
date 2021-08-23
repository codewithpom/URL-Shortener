import json
import random
import string


def exists(url):
    data = json.loads(open("node_modules/data.json").read())
    if url in data.keys():
        return data[url]

    else:
        return False


def short(url):

    data = json.loads(open("node_modules/data.json").read())

    while True:
        word = ''.join(random.choices(string.ascii_uppercase +
                                      string.digits, k=7))
        url_exists = exists(word)
        if not url_exists:
            data[word] = url
            file = open("node_modules/data.json", 'w')
            file.write(json.dumps(data))
            file.close()
            return word
        else:
            continue






