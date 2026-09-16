from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
import uvicorn
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load model and columns
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('model_columns.pkl', 'rb') as f:
        model_columns = pickle.load(f)
except FileNotFoundError:
    print("Model files not found. Please run main.py first.")
    exit(1)

class PropertyDetails(BaseModel):
    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float
    ocean_proximity: str

@app.post("/predict")
def predict_price(details: PropertyDetails):
    # Convert input to DataFrame
    df = pd.DataFrame([details.dict()])
    
    # Preprocessing
    df['total_rooms'] = np.log(df['total_rooms'] + 1)
    df['total_bedrooms'] = np.log(df['total_bedrooms'] + 1)
    df['population'] = np.log(df['population'] + 1)
    df['households'] = np.log(df['households'] + 1)
    
    # Dummy encoding
    df = df.join(pd.get_dummies(df['ocean_proximity']))
    df = df.drop('ocean_proximity', axis=1)
    
    # Align columns to match training
    # Any missing columns from training should be filled with 0
    # Any extra columns should be dropped
    for col in model_columns:
        if col not in df.columns:
            df[col] = 0
            
    df = df[model_columns]
    
    # Predict
    prediction = model.predict(df)[0]
    
    return {"estimated_price": prediction}

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
