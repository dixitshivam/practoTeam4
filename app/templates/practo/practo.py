from flask import Flask, url_for
from jinja2 import Environment, PackageLoader

env = Environment(loader=PackageLoader('practo', "templates"))
basic_template = env.get_template('basic_template.html')
search_template = env.get_template('search_template.html')
city_template = env.get_template('city_template.html')

app = Flask(__name__)

@app.route("/")
def home_page():
	practoCSS = url_for('static', filename='practo.css')
	functionsJS = url_for('static', filename='city.js')
	return city_template.render(practoCSS=practoCSS, functionsJS=functionsJS)

@app.route("/<city>")
def search_page(city,index=1):
	practoCSS = url_for('static', filename='practo.css')
	functionsJS = url_for('static', filename='functions.js')
	return search_template.render(practoCSS=practoCSS, functionsJS=functionsJS, city=city, index=index)

@app.route("/<city>/<index>")
def search_page_index(city,index):
	practoCSS = url_for('static', filename='practo.css')
	functionsJS = url_for('static', filename='functions.js')
	return search_template.render(practoCSS=practoCSS, functionsJS=functionsJS, city=city, index=index)	

if __name__ == "__main__":
	app.run(debug=True)
