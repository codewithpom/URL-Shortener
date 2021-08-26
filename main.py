from flask import Flask, request, render_template, redirect
import data
from flask_cors import CORS
import password as pass_solver
import visits

app = Flask('app')

CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api")
def api_page():
    return render_template("documentation.html")


@app.route("/make", methods=['POST'])
def make():
    print(request.form)
    if 'url' in request.form:
        url = request.form['url']

        shortened_url = data.short(url)

        if 'password' in request.form:
            if request.form['password'].replace(" ", "") != "":
                pass_solver.add_link(shortened_url, request.form['password'])
        else:
            pass_solver.add_link(shortened_url, "")

        return {'short' : shortened_url}

    return {"Error" : "Invalid Body"}


@app.route("/views")
def show_views():
    return render_template("log.html")


@app.route("/logs", methods=['POST'])
def logs():
    if 'url' in request.form:
        url = request.form['url'].split("/")[-1]
        password = None

        if 'password' in request.form:
            password = request.form['password']

        login_correct = pass_solver.login(url, password)
        if login_correct:
            print("Correct Login")
            print(visits.get_visit(url))
            return {'data': visits.get_visit(url)}
        else:
            return {'Failure' : 'Wrong Credentials'}

    else:
        return {'Failure' : 'Wrong Post Body'}


@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == "GET":
        return render_template("contact.html")

    elif request.method == "POST" and 'name' in request.form and 'email' in request.form and 'message' in request.form:
        message = request.form['message']
        email = request.form['email']
        name = request.form['name']
        try:
            file = open("problems.csv", 'a')
            file.write(f'"{name}","{email}","{message}"\n')
            file.close()
            return {"Success" : "Added to database"}

        except Exception:
            return {"Failure" : "Some error has occurred"}


@app.route("/<code>")
def show_direction(code):
        long_url = data.exists(code)
        if long_url:
                visits.add_visit(code, request.user_agent.platform, request.user_agent.browser, request.referrer)
                return redirect(long_url)
        else:
                return render_template("404.html"), 404


app.run(host="0.0.0.0", port=8080, debug=True)
