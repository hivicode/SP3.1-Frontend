from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

client = MongoClient("mongodb:///localhost:27017/")
db = client["nama-database"]
products = db["nama-table"]

@app.route("/")
def index():
  data = products.find()
  return render_template("index.html", products=data)

@app.route("/product/<id>")
def detail(id):
  product = products.find_one({"_id": ObjectId(id)})
  return render_template("detail.html", product=product)

@app.route("/cart")
def cart():
  return render_template("cart.html")

if __name__ == "__main__":
  app.run(debug=True)
