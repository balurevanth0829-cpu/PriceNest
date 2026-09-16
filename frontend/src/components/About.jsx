import React from 'react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">About PriceNest</h2>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6 text-slate-600 leading-relaxed">
        <p>
          PriceNest is a machine-learning-based house price prediction system that uses property features from housing data to estimate house prices.
        </p>
        
        <p>
          Our model has been trained on real-world housing datasets. The pipeline involves several key steps:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Data Preprocessing:</strong> Handling missing values to ensure robust model performance.</li>
          <li><strong>Feature Engineering:</strong> Applying logarithmic transformations to skewed numerical data (like rooms and population) and using one-hot encoding for categorical variables (like ocean proximity).</li>
          <li><strong>Machine Learning:</strong> We utilize a Linear Regression algorithm to learn the relationships between house features and their median value.</li>
          <li><strong>Price Prediction:</strong> Delivering fast, real-time estimated values based on user inputs.</li>
        </ul>
      </div>
    </div>
  );
}
