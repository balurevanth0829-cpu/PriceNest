import React, { useState } from 'react';
import Landing from './components/Landing';
import PropertyDetails from './components/PropertyDetails';
import Loading from './components/Loading';
import Result from './components/Result';
import About from './components/About';
import { Building2 } from 'lucide-react';

function App() {
  // Navigation states: 'landing', 'form', 'loading', 'result', 'about'
  const [currentView, setCurrentView] = useState('landing');
  const [prediction, setPrediction] = useState(null);
  
  const handleStart = () => {
    setCurrentView('form');
  };

  const handleSubmit = async (formData) => {
    setCurrentView('loading');
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Prediction request failed');
      }
      
      const data = await response.json();
      
      // Simulate slight delay for smooth UX
      setTimeout(() => {
        setPrediction(data.estimated_price);
        setCurrentView('result');
      }, 1500);
      
    } catch (error) {
      console.error(error);
      alert('Error connecting to prediction server.');
      setCurrentView('form');
    }
  };

  // Simple step calculation for progress indicator
  const getStep = () => {
    switch(currentView) {
      case 'landing': return 1;
      case 'form': return 2;
      case 'loading': return 3;
      case 'result': return 4;
      default: return 0;
    }
  };

  const step = getStep();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentView('landing')}
        >
          <div className="bg-brand-dark p-1.5 rounded-lg text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">PriceNest</span>
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setCurrentView('landing')}
            className="hover:text-brand transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('about')}
            className="hover:text-brand transition-colors"
          >
            About
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="container mx-auto max-w-6xl py-8">
          
          {/* Progress Indicator */}
          {step > 0 && currentView !== 'about' && (
            <div className="flex justify-center mb-10 max-w-md mx-auto px-4">
              <div className="flex items-center w-full justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
                
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 1 ? 'bg-brand-dark text-white' : 'bg-slate-200 text-slate-400'}`}>1</div>
                  <span className={`text-xs font-medium ${step >= 1 ? 'text-slate-700' : 'text-slate-400'}`}>Start</span>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 2 ? 'bg-brand-dark text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
                  <span className={`text-xs font-medium ${step >= 2 ? 'text-slate-700' : 'text-slate-400'}`}>Details</span>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 3 ? 'bg-brand-dark text-white' : 'bg-slate-200 text-slate-400'}`}>3</div>
                  <span className={`text-xs font-medium ${step >= 3 ? 'text-slate-700' : 'text-slate-400'}`}>Predict</span>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 4 ? 'bg-brand-dark text-white' : 'bg-slate-200 text-slate-400'}`}>4</div>
                  <span className={`text-xs font-medium ${step >= 4 ? 'text-slate-700' : 'text-slate-400'}`}>Result</span>
                </div>
              </div>
            </div>
          )}

          {/* Views */}
          {currentView === 'landing' && <Landing onStart={handleStart} />}
          {currentView === 'form' && <PropertyDetails onSubmit={handleSubmit} />}
          {currentView === 'loading' && <Loading />}
          {currentView === 'result' && <Result price={prediction} onReset={setCurrentView} />}
          {currentView === 'about' && <About />}
          
        </div>
      </main>
    </div>
  );
}

export default App;
