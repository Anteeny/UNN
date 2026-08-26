import React, { useState } from 'react';

const CGPATargetApp = () => {
  const [formData, setFormData] = useState({
    gpa1: '',
    credits1: '',
    targetCGPA: '',
    credits2: '',
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTarget = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    // The psychological tension delay (1.5 seconds)
    setTimeout(() => {
      const g1 = parseFloat(formData.gpa1);
      const c1 = parseFloat(formData.credits1);
      const t = parseFloat(formData.targetCGPA);
      const c2 = parseFloat(formData.credits2);

      // Core calculation: Target CGPA * Total Credits - (Sem 1 Points) / Sem 2 Credits
      const required = ((t * (c1 + c2)) - (g1 * c1)) / c2;
      
      setResult(required.toFixed(2));
      setIsCalculating(false);
    }, 1500);
  };

  const resetForm = () => {
    setResult(null);
    setFormData({ gpa1: '', credits1: '', targetCGPA: '', credits2: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-200">
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 uppercase">
            UNN CGPA Target
          </h1>
          <p className="text-slate-400 text-sm">
            Stop guessing. Calculate exactly what you need this semester.
          </p>
        </div>

        {/* Input Form */}
        {!result && !isCalculating && (
          <form onSubmit={calculateTarget} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">1st Sem GPA</label>
                <input required type="number" step="0.01" max="5.0" name="gpa1" value={formData.gpa1} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="e.g. 3.50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">1st Sem Credits</label>
                <input required type="number" name="credits1" value={formData.credits1} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="e.g. 21" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Target CGPA</label>
                <input required type="number" step="0.01" max="5.0" name="targetCGPA" value={formData.targetCGPA} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="e.g. 4.50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">2nd Sem Credits</label>
                <input required type="number" name="credits2" value={formData.credits2} onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="e.g. 24" />
              </div>
            </div>

            <button type="submit" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all uppercase tracking-wide">
              Calculate Target
            </button>
          </form>
        )}

        {/* Loading State */}
        {isCalculating && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm animate-pulse">Analyzing academic matrix...</p>
          </div>
        )}

        {/* Result & The Trap */}
        {result && !isCalculating && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Required 2nd Semester GPA</p>
              
              {result > 5.0 ? (
                <h2 className="text-5xl font-black text-red-500 tracking-tighter">IMPOSSIBLE</h2>
              ) : (
                <h2 className="text-6xl font-black text-white tracking-tighter">{result}</h2>
              )}
              
              {result > 5.0 && <p className="text-red-400 text-sm mt-2">Target exceeds 5.0 scale. Lower your target CGPA.</p>}
            </div>

            {/* The Blur Gate - This is the conversion engine */}
            <div className="relative mt-8 rounded-xl overflow-hidden border border-slate-800 bg-slate-800/50 p-6">
              <div className="blur-sm select-none opacity-50">
                <h3 className="font-bold text-lg text-white mb-2">Course Strategy Breakdown</h3>
                <ul className="text-sm space-y-2 text-slate-300">
                  <li>• GS 104 Blueprint: Secured</li>
                  <li>• Departmental Past Questions: Ready</li>
                  <li>• Proven 2nd Semester Hacks: Unlocked</li>
                </ul>
              </div>
              
              {/* The CTA Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-900/40">
                <a 
                  href="https://whatsapp.com/channel/0029VbDPAfJ6xCSU72R6JA0F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105"
                >
                  UNLOCK SURVIVAL VAULT
                </a>
                <p className="text-[10px] text-slate-300 mt-2 uppercase tracking-widest font-semibold">
                  Join 2,000+ Freshers in the Master Hub
                </p>
              </div>
            </div>

            <button onClick={resetForm} className="mt-6 w-full text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Calculate another target
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CGPATargetApp;