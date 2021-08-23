import re
import requests
from bs4 import BeautifulSoup
import os
import sys

url_data = requests.get("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css").text

files = os.listdir("templates")

# classes = re.findall(regex, data)
classes = []

for file in files:
    data = open(os.path.join("templates", file))
    soup = BeautifulSoup(data, 'html.parser')
    body = soup.find("body")
    children = body.findChildren(recursive=True)

    for child in children:
        try:
            classes.append(child['class'][0])
        except Exception:
            continue

classes = list(set(classes))
all_classes_in_bootstrap = []

regex = r"(\.\w+.(.*?)\})"

classes_in_bootstrap_raw = re.findall(regex, url_data)

for entry in classes_in_bootstrap_raw:
    all_classes_in_bootstrap.append(entry[0])

for in_built in all_classes_in_bootstrap:
    if not in_built.startswith("."):
        print('Wrong')
        break

similar_classes = []

for each_class_in_bootstrap in all_classes_in_bootstrap:
    in_line_classes = each_class_in_bootstrap.split(".")[1].split("{")[0].split(" ")
    for in_line_class in in_line_classes:
        if in_line_class.split(",")[0] in classes:
            similar_classes.append(each_class_in_bootstrap)

different_classes = list(set(all_classes_in_bootstrap) - set(similar_classes))

print("Got different classes")
print(sys.getsizeof(url_data))

print('*{' in url_data)
for g in different_classes:
    if '*{' in g:
        continue
    url_data = url_data.replace(g, "\n")


print('*{' in url_data)
css_file = open("static\\bootstrap.css", 'w')
css_file.write(url_data)
css_file.close()

print(sys.getsizeof(url_data))

# print(url_data)

'''
for h in all_classes_in_bootstrap:
    print(h)
'''
