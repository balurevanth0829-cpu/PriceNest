import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-brand-light rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-brand animate-spin relative z-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-3">Analyzing Your Property...</h2>
      <p className="text-slate-500 max-w-md text-center">
        Our machine-learning model is calculating the estimated value based on your provided details.
      </p>
    </div>
  );
}
