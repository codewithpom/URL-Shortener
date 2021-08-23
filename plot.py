# Import libraries
import datetime

import numpy as np
import matplotlib.pyplot as plt
import visits


# Creating autocpt arguments
def func(pct, allvalues):
    absolute = int(pct / 100. * np.sum(allvalues))
    return "{:.1f}%\n({:d} g)".format(pct, absolute)


def pie_plot(names, data):

    # Wedge properties
    wp = {'linewidth': 1, 'edgecolor': "green"}

    # Creating plot
    fig, ax = plt.subplots(figsize=(10, 7))
    wedges, texts, auto = ax.pie(data,
                                 autopct=lambda pct: func(pct, data),
                                 labels=names,
                                 shadow=True,
                                 startangle=90,
                                 wedgeprops=wp,
                                 textprops=dict(color="#00008b"))

    # Adding legend
    ax.legend(wedges, names,
              title="Operating Systems",
              loc="center left",
              bbox_to_anchor=(1, 0, 0.5, 1))

    plt.setp(auto, size=8, weight="bold")
    ax.set_title("OS Visited Totally")

    # return plot object
    return plt


def total_os_visited_pie(code):
    data = {}
    total_visits = visits.get_visit(code)
    for i in total_visits:
        platform = i['platform']
        if platform not in data.keys():
            data[platform] = 0

        data[platform] += 1

    names = data.keys()
    values = []

    for i in data:
        values.append(float(data[i]))

    graph = pie_plot(names, values)
    graph.show()


def date_os_visited_pie(code, year_start, year_end, month_start, month_end, date_start, date_end):
    data = {}
    total_visits = visits.get_visit(code)
    for i in total_visits:
        platform = i['platform']
        date_list = str(i['date']).split("-")
        date = datetime.datetime(int(date_list[2]), int(date_list[0]), int(date_list[1]))
        if platform not in data.keys():
            data[platform] = 0

        data[platform] += 1

    names = data.keys()
    values = []

    for i in data:
        values.append(float(data[i]))



if __name__ == '__main__':

    total_os_visited_pie("P37NZFA")
