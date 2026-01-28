import React, { useState, useEffect } from 'react';

const CybersecurityFeedbackApp = () => {
  // NEW: Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [currentPage, setCurrentPage] = useState('home');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Simulated Loading Sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800); // Small delay after 100% for impact
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1; // Randomized increments for a "real" feel
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const quizQuestions = [
    {
      question: "What is the primary function of Malware?",
      options: ["System Optimization", "Exploitation & Damage", "Antivirus Shielding", "Hardware Cooling"],
      correctAnswer: 1,
      explanation: "Malware is an umbrella term for malicious code designed to infiltrate, damage, or disable computer systems without user consent."
    },
    {
      question: "Define the 'Trojan' attack vector.",
      options: ["Packet Sniffing", "Legitimate Software Disguise", "Brute Force Entry", "Phishing Link"],
      correctAnswer: 1,
      explanation: "A Trojan Horse masks its true intent by appearing as a helpful or harmless program, tricking the user into executing it."
    },
    {
      question: "What defines a Ransomware strike?",
      options: ["File Encryption & Extortion", "Free Software Distribution", "Cloud Data Syncing", "CPU Overclocking"],
      correctAnswer: 0,
      explanation: "Ransomware locks your system or data behind encryption, demanding a digital currency payment to provide the decryption key."
    },
    {
        question: "What is a 'Zero-Day' exploit?",
        options: ["A vulnerability fixed instantly", "An old known bug", "A flaw unknown to vendors", "A virus that lasts 24 hours"],
        correctAnswer: 2,
        explanation: "Zero-Day refers to a software vulnerability discovered by attackers before the vendor has knowledge of it."
    },
    {
        question: "Explain Multi-Factor Authentication (MFA).",
        options: ["Multiple passwords", "Layered verification factors", "Fingerprint only", "Hardware-only lock"],
        correctAnswer: 1,
        explanation: "MFA requires at least two pieces of evidence to verify identity: something you know and something you have."
    }
  ];

  useEffect(() => {
    if (quizStarted && !showResults) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, quizStarted, showResults]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim()) setSubmitted(true);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
    setAnswers([...answers, { questionIndex: currentQuestion, selectedAnswer: index, isCorrect }]);
    if (isCorrect) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  // RENDER LOADER
  if (isLoading) {
    return (
      <div className="loader-screen">
        <div className="noise"></div>
        <div className="loader-content">
          <div className="loader-meta">INITIALIZING_SEC_PROTO // 2026</div>
          <div className="loader-percentage">{loadingProgress}%</div>
          <div className="loader-bar-container">
            <div className="loader-bar-fill" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="loader-status">
            {loadingProgress < 40 && "LOADING CORE ASSETS..."}
            {loadingProgress >= 40 && loadingProgress < 80 && "DECRYPTING SECURITY VECTORS..."}
            {loadingProgress >= 80 && "ESTABLISHING ENCRYPTED TUNNEL..."}
          </div>
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;900&display=swap');
          .loader-screen {
            height: 100vh; width: 100vw; background: #0A0A0A;
            display: flex; align-items: center; justify-content: center;
            color: white; font-family: 'Jost', sans-serif; position: fixed; z-index: 1000;
          }
          .loader-content { width: 100%; max-width: 600px; padding: 40px; }
          .loader-meta { font-size: 12px; letter-spacing: 4px; color: #666; margin-bottom: 20px; }
          .loader-percentage { font-size: 10rem; font-weight: 900; line-height: 1; margin-bottom: 20px; letter-spacing: -5px; }
          .loader-bar-container { width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-bottom: 20px; position: relative; }
          .loader-bar-fill { height: 100%; background: #00FFD1; transition: width 0.2s ease-out; }
          .loader-status { font-size: 10px; letter-spacing: 2px; color: #00FFD1; text-transform: uppercase; animation: flicker 1.5s infinite; }
          @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          .noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: url('https://grainy-gradients.vercel.app/noise.svg'); opacity: 0.15; pointer-events: none; }
        `}</style>
      </div>
    );
  }

  // RENDER MAIN APP
  return (
    <div className="app-container fade-in">
      <div className="noise"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <nav className="top-nav">
        <div className="logo">SEC_PROTO // 2026</div>
        <div className="status-indicator"><span className="dot"></span> SYSTEM ACTIVE</div>
      </nav>

      <main className="content">
        {currentPage === 'home' && (
          <section className="view home-view">
            <div className="hero-wrap">
              <h1 className="main-title">KNOWLEDGE <br /><span className="outline">IS SECURITY.</span></h1>
              <p className="hero-description">The session is concluded. Your final protocols require a feedback submission and a mandatory knowledge assessment.</p>
            </div>
            <div className="action-grid">
              <div className="card-box" onClick={() => setCurrentPage('review')}>
                <div className="card-header">01</div>
                <h3>PERCEPTION REVIEW</h3>
                <p>Submit your experience data for system optimization.</p>
                <div className="arrow-link">INITIATE →</div>
              </div>
              <div className="card-box primary" onClick={() => { setCurrentPage('quiz'); setQuizStarted(true); }}>
                <div className="card-header">02</div>
                <h3>KNOWLEDGE ASSESS</h3>
                <p>Validate your understanding of cyber-threat vectors.</p>
                <div className="arrow-link">START SCAN →</div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'review' && (
          <section className="view review-view">
            <button className="minimal-back" onClick={() => setCurrentPage('home')}>BACK</button>
            <div className="form-container">
              {!submitted ? (
                <form onSubmit={handleRatingSubmit} className="review-form">
                  <h2 className="section-title">RATE INTEL</h2>
                  <div className="stars-wrapper">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className={`big-star ${rating >= star ? 'active' : ''}`} onClick={() => setRating(star)}>★</button>
                    ))}
                  </div>
                  <div className="input-group">
                    <label>DETAILED OBSERVATION</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="ENTER DATA..." rows="6" />
                  </div>
                  <button type="submit" className="mega-button" disabled={rating === 0 || !review.trim()}>TRANSMIT DATA</button>
                </form>
              ) : (
                <div className="success-screen">
                  <h2 className="main-title">LOGGED.</h2>
                  <p>Your feedback has been integrated into the database.</p>
                  <button className="mega-button" onClick={() => { setCurrentPage('quiz'); setQuizStarted(true); }}>NEXT: TAKE QUIZ</button>
                </div>
              )}
            </div>
          </section>
        )}

        {currentPage === 'quiz' && quizStarted && !showResults && (
          <section className="view quiz-view">
            <div className={`scan-line ${isScanning ? 'active' : ''}`}></div>
            <div className="quiz-meta">
              <span className="node-id">NODE_{currentQuestion + 1}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div></div>
            </div>
            <div className="question-block">
              <h2 className="quiz-question">{quizQuestions[currentQuestion].question}</h2>
              <div className="options-stack">
                {quizQuestions[currentQuestion].options.map((opt, i) => (
                  <button 
                    key={i} 
                    className={`opt-btn ${selectedAnswer === i ? 'focused' : ''} ${showFeedback && i === quizQuestions[currentQuestion].correctAnswer ? 'success' : ''} ${showFeedback && selectedAnswer === i && i !== quizQuestions[currentQuestion].correctAnswer ? 'danger' : ''}`}
                    onClick={() => !showFeedback && handleAnswerSelect(i)}
                    disabled={showFeedback}
                  >
                    <span className="opt-index">0{i+1}</span>
                    <span className="opt-label">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
            {showFeedback && (
              <div className="feedback-drawer">
                <p className="explainer">{quizQuestions[currentQuestion].explanation}</p>
                <button className="mega-button" onClick={handleNextQuestion}>NEXT PROTOCOL</button>
              </div>
            )}
          </section>
        )}

        {showResults && (
          <section className="view results-view">
             <div className="id-card">
                <div className="id-header">SECURITY CLEARANCE</div>
                <div className="id-body">
                   <div className="id-avatar">
                      <span className="percent">{Math.round((score/quizQuestions.length)*100)}%</span>
                   </div>
                   <div className="id-info">
                      <h3>OPERATIVE STATUS</h3>
                      <p className="status-rank">{score > 3 ? "CERTIFIED EXPERT" : "RE-TRAINING REQUIRED"}</p>
                      <div className="stat-row">
                         <span>SCORE:</span> <strong>{score} / {quizQuestions.length}</strong>
                      </div>
                   </div>
                </div>
                <div className="id-footer">ISSUED: JAN 2026 // SYSTEM_VERIFIED</div>
             </div>
             <button className="minimal-back mt-20" onClick={() => window.location.reload()}>RE-INITIALIZE SYSTEM</button>
          </section>
        )}
      </main>

      <style>{`
        /* Reuse previous styles but add the fade-in for the main container */
        .fade-in { animation: fadeIn 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;900&display=swap');
        :root { --accent: #00FFD1; --bg: #0A0A0A; --text: #FFFFFF; --dim: #666666; --card-bg: rgba(255, 255, 255, 0.03); }
        body { font-family: 'Jost', sans-serif; background-color: var(--bg); color: var(--text); overflow-x: hidden; }
        .app-container { min-height: 100vh; padding: 80px 40px; display: flex; flex-direction: column; align-items: center; position: relative; }
        .orb { position: fixed; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.1; z-index: -1; }
        .orb-1 { background: var(--accent); top: -200px; right: -200px; }
        .orb-2 { background: #7000FF; bottom: -200px; left: -200px; }
        .top-nav { position: fixed; top: 0; width: 100%; padding: 40px; display: flex; justify-content: space-between; font-size: 12px; letter-spacing: 2px; font-weight: 600; z-index: 100; }
        .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; display: inline-block; margin-right: 8px; box-shadow: 0 0 10px var(--accent); }
        .content { width: 100%; max-width: 1100px; margin-top: 60px; }
        .main-title { font-size: 8rem; font-weight: 900; line-height: 0.9; letter-spacing: -4px; margin-bottom: 2rem; }
        .outline { -webkit-text-stroke: 1px white; color: transparent; }
        .hero-description { max-width: 500px; font-size: 1.2rem; color: var(--dim); font-weight: 300; margin-bottom: 5rem; }
        .action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .card-box { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); padding: 60px; cursor: pointer; transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .card-box:hover { background: rgba(255,255,255,0.07); transform: translateY(-10px); border-color: var(--accent); }
        .card-header { font-size: 12px; color: var(--accent); margin-bottom: 20px; }
        .card-box h3 { font-size: 2rem; margin-bottom: 1rem; }
        .card-box p { color: var(--dim); margin-bottom: 2rem; line-height: 1.5; }
        .opt-btn { width: 100%; background: none; border: 1px solid rgba(255,255,255,0.1); padding: 30px; color: white; display: flex; align-items: center; gap: 20px; font-size: 1.2rem; font-family: 'Jost'; cursor: pointer; transition: 0.3s; margin-bottom: 10px; }
        .opt-btn:hover { background: rgba(255,255,255,0.05); padding-left: 40px; }
        .mega-button { background: white; color: black; border: none; padding: 25px 50px; font-weight: 900; font-family: 'Jost'; font-size: 1rem; letter-spacing: 2px; cursor: pointer; margin-top: 40px; }
        .quiz-question { font-size: 3rem; margin-bottom: 4rem; font-weight: 600; }
        .id-card { background: #111; border: 1px solid #333; padding: 40px; max-width: 500px; margin: 0 auto; }
        .status-rank { font-size: 1.5rem; font-weight: 900; color: var(--accent); }
        .input-group textarea { width: 100%; background: #111; border: 1px solid #333; color: white; padding: 20px; font-family: 'Jost'; font-size: 1.2rem; }
        .stars-wrapper { margin-bottom: 40px; }
        .big-star { background: none; border: none; font-size: 3rem; color: #333; cursor: pointer; margin-right: 10px; transition: 0.3s; }
        .big-star.active { color: var(--accent); }
        .scan-line { position: absolute; left: 0; width: 100%; height: 100px; background: linear-gradient(to bottom, transparent, rgba(0, 255, 209, 0.1), transparent); border-bottom: 2px solid var(--accent); opacity: 0; pointer-events: none; }
        .scan-line.active { animation: scan 1.2s linear; }
        @keyframes scan { 0% { top: 0%; opacity: 0; } 20% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
      `}</style>
    </div>
  );
};

export default CybersecurityFeedbackApp;