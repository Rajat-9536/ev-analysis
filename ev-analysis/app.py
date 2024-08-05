from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load and preprocess data
df = pd.read_csv('ev_data.csv')
df = df.dropna()
df['Model Year'] = df['Model Year'].astype(int)
df['Electric Range'] = df['Electric Range'].astype(int)

# Prepare data for linear regression
years = df['Model Year'].value_counts().sort_index().index.values.reshape(-1, 1)
sales = df['Model Year'].value_counts().sort_index().values.reshape(-1, 1)

# EV distribution by city
@app.route('/api/ev-by-city', methods=['GET'])
def ev_by_city():
    city_counts = df['City'].value_counts().reset_index()
    city_counts.columns = ['City', 'EV Count']
    return jsonify(city_counts.to_dict(orient='records'))

# EV distribution by county
@app.route('/api/ev-by-county', methods=['GET'])
def ev_by_county():
    county_counts = df['County'].value_counts().reset_index()
    county_counts.columns = ['County', 'EV Count']
    return jsonify(county_counts.to_dict(orient='records'))

# EV distribution by state
@app.route('/api/ev-by-state', methods=['GET'])
def ev_by_state():
    state_counts = df['State'].value_counts().reset_index()
    state_counts.columns = ['State', 'EV Count']
    return jsonify(state_counts.to_dict(orient='records'))

# Growth trend by model year
@app.route('/api/ev-growth-trend', methods=['GET'])
def ev_growth_trend():
    year_counts = df['Model Year'].value_counts().sort_index().reset_index()
    year_counts.columns = ['Model Year', 'EV Count']
    return jsonify(year_counts.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)
