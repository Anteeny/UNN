import React, { useState, useEffect } from 'react';

const CGPATargetApp = () => {
  const [formData, setFormData] = useState({
    gpa1: '',
    credits1: '',
    targetCGPA: '',
    credits2: '',
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Track mouse for subtle glow effect
    const handleMouse = (e) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTarget = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const g1 = parseFloat(formData.gpa1);
      const c1 = parseFloat(formData.credits1);
      const t = parseFloat(formData.targetCGPA);
      const c2 = parseFloat(formData.credits2);

      const required = ((t * (c1 + c2)) - (g1 * c1)) / c2;
      
      setResult(required.toFixed(2));
      setIsCalculating(false);
    }, 1500);
  };

  const resetForm = () => {
    setResult(null);
    setFormData({ gpa1: '', credits1: '', targetCGPA: '', credits2: '' });
  };

  // Generate floating particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    top: `${20 + Math.random() * 60}%`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 2}px`,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Animated Background */}
      <div className="bg-animated" />

      {/* Main Card */}
      <div 
        className={`w-full max-w-md glass-card rounded-3xl p-8 relative overflow-hidden z-10 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Floating Orbs inside card */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }}
          />
        ))}

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#34d399' }}>
              UNN Undergraduate Tool
            </span>
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#f8fafc', marginBottom: '10px' }}>
            CGPA Target
            <br />
            <span style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Calculator
            </span>
          </h1>
          <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
            Stop guessing. Calculate exactly what you need this semester.
          </p>
        </div>

        {/* Input Form */}
        {!result && !isCalculating && (
          <form onSubmit={calculateTarget} className="space-y-5 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="fade-in-up stagger-1">
                <label className="label-text">1st Sem GPA</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  max="5.0"
                  name="gpa1"
                  value={formData.gpa1}
                  onChange={handleInputChange}
                  className="input-premium"
                  placeholder="e.g. 3.50"
                />
              </div>
              <div className="fade-in-up stagger-2">
                <label className="label-text">1st Sem Credits</label>
                <input
                  required
                  type="number"
                  name="credits1"
                  value={formData.credits1}
                  onChange={handleInputChange}
                  className="input-premium"
                  placeholder="e.g. 21"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="fade-in-up stagger-3">
                <label className="label-text">Target CGPA</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  max="5.0"
                  name="targetCGPA"
                  value={formData.targetCGPA}
                  onChange={handleInputChange}
                  className="input-premium"
                  placeholder="e.g. 4.50"
                />
              </div>
              <div className="fade-in-up stagger-4">
                <label className="label-text">2nd Sem Credits</label>
                <input
                  required
                  type="number"
                  name="credits2"
                  value={formData.credits2}
                  onChange={handleInputChange}
                  className="input-premium"
                  placeholder="e.g. 24"
                />
              </div>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
              <button type="submit" className="btn-glow w-full mt-2">
                Calculate Target
              </button>
            </div>
          </form>
        )}

        {/* Loading State */}
        {isCalculating && (
          <div className="py-16 flex flex-col items-center justify-center space-y-5 relative z-10 fade-in-up">
            <div className="spinner" />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#ffffff', fontSize: '13px', letterSpacing: '0.05em' }} className="animate-pulse">
              Analyzing academic matrix...
            </p>
          </div>
        )}

        {/* Result & The Trap */}
        {result && !isCalculating && (
          <div className="relative z-10">
            <div className="text-center mb-8 fade-in-up">
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '12px' }}>
                Required 2nd Semester GPA
              </p>
              
              {result > 5.0 ? (
                <h2 className="result-impossible">IMPOSSIBLE</h2>
              ) : (
                <h2 className="result-number">{result}</h2>
              )}
              
              {result > 5.0 && (
                <p style={{ color: '#ffffff', fontSize: '13px', marginTop: '12px' }}>
                  Target exceeds 5.0 scale. Lower your target CGPA.
                </p>
              )}
            </div>

            {/* The Blur Gate */}
            <div className="blur-gate mt-8 fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="blur-gate-content">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', color: '#f1f5f9', marginBottom: '12px' }}>
                  Course Strategy Breakdown
                </h3>
                <ul style={{ fontSize: '13px', color: '#94a3b8' }} className="space-y-2.5">
                  <li>✦ GS 104 Blueprint: Secured</li>
                  <li>✦ Departmental Past Questions: Ready</li>
                  <li>✦ Proven 2nd Semester Hacks: Unlocked</li>
                </ul>
              </div>
              
              {/* CTA Overlay */}
              <div className="blur-gate-overlay">
                <a 
                  href="https://whatsapp.com/channel/0029VbDPAfJ6xCSU72R6JA0F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-unlock"
                >
                  🔓 Unlock Survival Vault
                </a>
                <p style={{ fontSize: '10px', color: '#ffffff', marginTop: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Join 2,000+ Freshers in the Master Hub
                </p>
              </div>
            </div>

            <button 
              onClick={resetForm} 
              className="mt-6 w-full text-sm transition-all duration-300 hover:text-slate-200 fade-in-up"
              style={{ 
                animationDelay: '0.35s', opacity: 0,
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'rgba(148, 163, 184, 0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.02em',
              }}
            >
              ← Calculate another target
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p 
        className="relative z-10 mt-6"
        style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px', 
          color: '#ffffff',
          letterSpacing: '0.05em',
        }}
      >
        Built for UNN Freshers
      </p>
    </div>
  );
};

export default CGPATargetApp;