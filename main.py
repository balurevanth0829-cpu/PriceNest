import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
df=pd.read_csv("Housing.csv")
print(df.head())
print(df.isnull().sum())
df=df.dropna()
X=df.drop(["median_house_value"],axis=1)
y=df["median_house_value"]
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2)
train_data = pd.concat([X_train, y_train], axis=1)
print(train_data.head())
train_data['total_rooms'] = np.log(train_data['total_rooms'] + 1)
train_data['total_bedrooms']=np.log(train_data['total_bedrooms']+1)
train_data['population']=np.log(train_data['population']+1)
train_data['households']=np.log(train_data['households']+1)
c=train_data.hist(figsize=(15,8))
plt.show()
train_data=train_data.join(pd.get_dummies(train_data['ocean_proximity'])).drop('ocean_proximity',axis=1)
print(train_data.head())
from sklearn.linear_model import LinearRegression


# Create model
model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print(predictions)
sample_house = X_test.iloc[0:1]

predicted_price = model.predict(sample_house)

print(predicted_price)
sample_house = X_test.iloc[0:1]

predicted_price = model.predict(sample_house)

print(predicted_price)
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, predictions)

print("Mean Absolute Error:", mae)
from sklearn.metrics import r2_score

r2 = r2_score(y_test, predictions)

print("R² Score:", r2)