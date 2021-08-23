import json


def add_link(url, password):
    data = json.loads(open("node_modules/password.json").read())
    data[url] = password
    file = open("node_modules/password.json", 'w')
    file.write(json.dumps(data))
    file.close()


def login(url, password):
    data = json.loads(open("node_modules/password.json").read())
    if url not in data.keys():
        return False
    if password is None:
        password = ""

    if data[url] == password:
        return True

    else:
        return False

