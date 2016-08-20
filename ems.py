# --*-- coding:utf-8 --*--

from flask import Flask, render_template
from flask.ext.bootstrap import Bootstrap

app = Flask(__name__)

bootstrap = Bootstrap(app)


@app.route('/')
def index():
    return render_template("login.html")

if __name__ == '__main__':
    app.run(debug=True)