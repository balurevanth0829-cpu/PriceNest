import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

def preprocess_data(X):
    X_proc = X.copy()
    # Log transformations as per original logic
    X_proc['total_rooms'] = np.log(X_proc['total_rooms'] + 1)
    X_proc['total_bedrooms'] = np.log(X_proc['total_bedrooms'] + 1)
    X_proc['population'] = np.log(X_proc['population'] + 1)
    X_proc['households'] = np.log(X_proc['households'] + 1)
    
    # Dummy encoding
    X_proc = X_proc.join(pd.get_dummies(X_proc['ocean_proximity'])).drop('ocean_proximity', axis=1)
    return X_proc

if __name__ == "__main__":
    print("Loading data...")
    df = pd.read_csv("Housing.csv")
    df = df.dropna()
    
    X = df.drop(["median_house_value"], axis=1)
    y = df["median_house_value"]
    
    # We must preprocess before split or align columns after split.
    print("Preprocessing data...")
    X_proc = preprocess_data(X)
    
    # Save the expected column order for the API
    model_columns = list(X_proc.columns)
    with open('model_columns.pkl', 'wb') as f:
        pickle.dump(model_columns, f)
    
    X_train, X_test, y_train, y_test = train_test_split(X_proc, y, test_size=0.2, random_state=42)
    
    print("Training model...")
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Save the model
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Model saved to model.pkl")
    
    predictions = model.predict(X_test)
    
    mae = mean_absolute_error(y_test, predictions)
    print("Mean Absolute Error:", mae)
    
    r2 = r2_score(y_test, predictions)
    print("R² Score:", r2)