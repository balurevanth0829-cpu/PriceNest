import React from 'react';
import { Home } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mb-8 shadow-sm">
        <Home className="w-12 h-12 text-brand-dark" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-tight mb-4">
        Know Your House Price
      </h1>
      
      <h2 className="text-xl md:text-2xl text-slate-600 mb-6 font-medium max-w-2xl">
        Get an estimated value of your property using Machine Learning.
      </h2>
      
      <p className="text-slate-500 mb-10 max-w-lg leading-relaxed">
        Enter a few details about your house and let our machine-learning model estimate its price based on real housing data.
      </p>
      
      <button 
        onClick={onStart}
        className="px-8 py-4 bg-brand-dark hover:bg-brand text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
      >
        Start
      </button>
    </div>
  );
}
