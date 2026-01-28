import React from "react";

const HomePage = ({ setCurrentPage, setQuizStarted }) => (
  <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
        Training <span className="text-indigo-600">Complete.</span>
      </h1>
      <p className="text-xl text-slate-500">Cybersecurity Pre-training — Jan 28, 2026</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div 
        onClick={() => setCurrentPage('review')}
        className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        <div className="text-4xl mb-6">⭐</div>
        <h2 className="text-2xl font-bold mb-3">Rate & Review</h2>
        <p className="text-slate-600 mb-8 leading-relaxed">Your feedback helps us sharpen our training modules for the next session.</p>
        <span className="text-indigo-600 font-bold group-hover:gap-3 flex items-center gap-2 transition-all">
          Give Feedback <span>→</span>
        </span>
      </div>

      <div 
        onClick={() => { setCurrentPage('quiz'); setQuizStarted(true); }}
        className="group bg-slate-900 p-10 rounded-[2.5rem] shadow-xl cursor-pointer hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all duration-300"
      >
        <div className="text-4xl mb-6">🎯</div>
        <h2 className="text-2xl font-bold mb-3 text-white">Take the Quiz</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">Test your knowledge on the core security concepts we covered today.</p>
        <span className="text-indigo-400 font-bold group-hover:gap-3 flex items-center gap-2 transition-all">
          Start Quiz <span>→</span>
        </span>
      </div>
    </div>
  </div>
);

export default HomePage;