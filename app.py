import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template

app = Flask(__name__)

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///db/crime_data.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
crime_data = Base.classes.crime_data
# Create our session (link) from Python to the DB
session = Session(engine)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("Marker_Clusters.html")


@app.route("/crime_data/")
def crime():
   
    """Return a list of all locations"""
    # Query all passengers
    sel = [
        crime_data.latitude,
        crime_data.longitude,
        crime_data.date,
    ]
    results = session.query(*sel).all()
    crime_data2 = []
    for result in results:
        crime_dict = {}
        crime_dict["latitude"] = result[0]
        crime_dict["longitude"] = result[1]
        crime_dict["date"] = result[2]
        crime_data2.append(crime_dict)


    # all_locations = list(np.ravel(crime_data2))

    return jsonify(crime_data2)


if __name__ == "__main__":
    app.run()