import json
from pytz import timezone
from datetime import datetime


def add_visit(code, platform, browser, referrer):
    data = json.loads(open("node_modules/visits.json").read())
    if platform is None:
        return ""
    if code in data.keys():
        data[code].append({"platform" : platform, 'browser': browser, 'referrer' : referrer, 'time' : datetime.now(timezone("Asia/Kolkata")).strftime('%H:%M:%S'), 'date' : datetime.now(timezone("Asia/Kolkata")).strftime('%d-%m-%Y')})
    else:
        data[code] = []
        data[code].append({"platform" : platform, 'browser': browser, 'referrer' : referrer, 'time' : datetime.now(timezone("Asia/Kolkata")).strftime('%H:%M:%S'), 'date' : datetime.now(timezone("Asia/Kolkata")).strftime('%d-%m-%Y')})

    file = open("node_modules/visits.json", 'w')
    file.write(json.dumps(data))
    file.close()


def get_visit(code):
    data = json.loads(open("node_modules/visits.json").read())
    if code not in data.keys():
        return {}

    return data[code]

