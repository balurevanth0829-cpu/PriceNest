import React, { useState } from 'react';

export default function PropertyDetails({ onSubmit }) {
  const [formData, setFormData] = useState({
    longitude: -122.23,
    latitude: 37.88,
    housing_median_age: 41.0,
    total_rooms: 880.0,
    total_bedrooms: 129.0,
    population: 322.0,
    households: 126.0,
    median_income: 8.3252,
    ocean_proximity: 'NEAR BAY'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ocean_proximity' ? value : parseFloat(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Tell Us About Your House</h2>
        <p className="text-slate-600">Enter the details below to estimate your property's price.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Longitude */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
              <input 
                type="number" step="any" name="longitude" required
                value={formData.longitude} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. -122.23"
              />
            </div>

            {/* Latitude */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
              <input 
                type="number" step="any" name="latitude" required
                value={formData.latitude} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 37.88"
              />
            </div>

            {/* Median Age */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Housing Median Age</label>
              <input 
                type="number" step="any" name="housing_median_age" required
                value={formData.housing_median_age} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 41"
              />
            </div>

            {/* Total Rooms */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Rooms</label>
              <input 
                type="number" step="any" name="total_rooms" required
                value={formData.total_rooms} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 880"
              />
            </div>

            {/* Total Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Bedrooms</label>
              <input 
                type="number" step="any" name="total_bedrooms" required
                value={formData.total_bedrooms} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 129"
              />
            </div>

            {/* Population */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Population</label>
              <input 
                type="number" step="any" name="population" required
                value={formData.population} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 322"
              />
            </div>

            {/* Households */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Households</label>
              <input 
                type="number" step="any" name="households" required
                value={formData.households} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 126"
              />
            </div>

            {/* Median Income */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Median Income</label>
              <input 
                type="number" step="any" name="median_income" required
                value={formData.median_income} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                placeholder="e.g. 8.32"
              />
            </div>

            {/* Ocean Proximity */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Ocean Proximity</label>
              <select 
                name="ocean_proximity" required
                value={formData.ocean_proximity} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all bg-white"
              >
                <option value="<1H OCEAN">&lt;1H OCEAN</option>
                <option value="INLAND">INLAND</option>
                <option value="ISLAND">ISLAND</option>
                <option value="NEAR BAY">NEAR BAY</option>
                <option value="NEAR OCEAN">NEAR OCEAN</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-brand-dark hover:bg-brand text-white font-semibold text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Predict House Price &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
