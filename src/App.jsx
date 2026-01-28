import React, { useState, useEffect } from 'react';

const CybersecurityFeedbackApp = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const quizQuestions = [
    {
      question: "What is the primary function of Malware?",
      options: ["System Optimization", "Exploitation & Damage", "Antivirus Shielding", "Hardware Cooling"],
      correctAnswer: 1,
      explanation: "Malware is an umbrella term for malicious code designed to infiltrate, damage, or disable computer systems without user consent. It includes viruses, worms, trojans, and ransomware."
    },
    {
      question: "Define the 'Trojan' attack vector.",
      options: ["Packet Sniffing", "Legitimate Software Disguise", "Brute Force Entry", "Phishing Link"],
      correctAnswer: 1,
      explanation: "A Trojan Horse masks its true intent by appearing as a helpful or harmless program, tricking the user into executing it. Named after the Greek myth, it hides malicious code inside seemingly legitimate software."
    },
    {
      question: "What defines a Ransomware strike?",
      options: ["File Encryption & Extortion", "Free Software Distribution", "Cloud Data Syncing", "CPU Overclocking"],
      correctAnswer: 0,
      explanation: "Ransomware locks your system or data behind encryption, demanding a digital currency payment (usually cryptocurrency) for the decryption key. Recent attacks have targeted hospitals, municipalities, and critical infrastructure."
    },
    {
      question: "What is a 'Zero-Day' exploit?",
      options: ["A vulnerability fixed instantly", "An old known bug", "A flaw unknown to vendors", "A virus that lasts 24 hours"],
      correctAnswer: 2,
      explanation: "Zero-Day refers to a software vulnerability discovered by attackers before the vendor has knowledge of it or has had zero days to create a patch. These are extremely valuable and dangerous exploits."
    },
    {
      question: "Explain Multi-Factor Authentication (MFA).",
      options: ["Multiple passwords", "Layered verification factors", "Fingerprint only", "Hardware-only lock"],
      correctAnswer: 1,
      explanation: "MFA requires at least two pieces of evidence to verify identity: something you know (password), something you have (phone/token), or something you are (biometric). This dramatically reduces unauthorized access risk."
    },
    {
      question: "What is a DDoS attack primarily designed to do?",
      options: ["Steal sensitive data", "Overwhelm systems with traffic", "Install backdoors", "Crack passwords"],
      correctAnswer: 1,
      explanation: "Distributed Denial of Service (DDoS) attacks flood a target system with massive amounts of traffic from multiple sources, making legitimate services unavailable to users. The goal is disruption, not data theft."
    },
    {
      question: "What is 'Phishing' in cybersecurity?",
      options: ["Hardware inspection", "Social engineering via deceptive messages", "Network scanning", "File compression"],
      correctAnswer: 1,
      explanation: "Phishing uses fraudulent emails, messages, or websites that appear legitimate to trick victims into revealing sensitive information like passwords, credit card numbers, or installing malware."
    },
    {
      question: "What does VPN stand for and what does it do?",
      options: ["Virtual Private Network - encrypts internet traffic", "Virus Protection Node - blocks malware", "Verified Public Network - shares files", "Variable Password Navigator - manages logins"],
      correctAnswer: 0,
      explanation: "A Virtual Private Network (VPN) creates an encrypted tunnel for your internet traffic, masking your IP address and protecting data from eavesdropping, especially on public Wi-Fi networks."
    },
    {
      question: "What is SQL Injection?",
      options: ["A type of medical procedure", "Inserting malicious code into database queries", "A programming language", "A network protocol"],
      correctAnswer: 1,
      explanation: "SQL Injection involves inserting malicious SQL code into application inputs to manipulate database queries. This can expose, modify, or delete sensitive data and is one of the most common web application vulnerabilities."
    },
    {
      question: "What is the purpose of a Firewall?",
      options: ["Cool down computer hardware", "Monitor and control network traffic", "Speed up internet connection", "Store passwords securely"],
      correctAnswer: 1,
      explanation: "A firewall acts as a barrier between trusted internal networks and untrusted external networks, monitoring incoming and outgoing traffic based on predetermined security rules to block malicious access."
    },
    {
      question: "What is 'Social Engineering' in cybersecurity?",
      options: ["Building social media platforms", "Psychological manipulation to gain access", "Network architecture design", "Software development method"],
      correctAnswer: 1,
      explanation: "Social Engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into breaking security procedures or divulging confidential information through deception, urgency, or authority."
    },
    {
      question: "What is the main purpose of encryption?",
      options: ["Speed up data transfer", "Convert data into unreadable format", "Compress files", "Delete temporary files"],
      correctAnswer: 1,
      explanation: "Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) using mathematical algorithms and keys. Only authorized parties with the decryption key can access the original information."
    },
    {
      question: "What is a 'Botnet'?",
      options: ["A robot network for factories", "Network of infected computers under remote control", "A social media platform", "An antivirus software"],
      correctAnswer: 1,
      explanation: "A Botnet is a network of compromised computers (zombies) controlled remotely by attackers. These are used to launch large-scale attacks like DDoS, send spam emails, or mine cryptocurrency without owners' knowledge."
    },
    {
      question: "What does 'Patch Management' refer to?",
      options: ["Repairing physical hardware", "Regularly updating software to fix vulnerabilities", "Network cable organization", "Data backup procedures"],
      correctAnswer: 1,
      explanation: "Patch Management is the process of identifying, acquiring, testing, and installing software updates (patches) that fix security vulnerabilities and bugs. Delayed patching is a leading cause of successful cyberattacks."
    },
    {
      question: "What is 'Two-Factor Authentication' (2FA)?",
      options: ["Using two passwords", "Verification requiring two different authentication methods", "Logging in twice", "Two antivirus programs"],
      correctAnswer: 1,
      explanation: "Two-Factor Authentication requires users to provide two different types of verification: typically something they know (password) and something they have (code from phone/app). This adds a critical security layer beyond passwords alone."
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
          .loader-screen { height: 100vh; width: 100vw; background: #0A0A0A; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Jost', sans-serif; position: fixed; z-index: 1000; }
          .loader-content { width: 90%; max-width: 600px; padding: 20px; }
          .loader-meta { font-size: 10px; letter-spacing: 4px; color: #666; margin-bottom: 15px; }
          .loader-percentage { font-size: clamp(5rem, 15vw, 10rem); font-weight: 900; line-height: 1; margin-bottom: 20px; letter-spacing: -5px; }
          .loader-bar-container { width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-bottom: 20px; }
          .loader-bar-fill { height: 100%; background: #00FFD1; transition: width 0.2s ease-out; }
          .loader-status { font-size: 9px; letter-spacing: 2px; color: #00FFD1; text-transform: uppercase; animation: flicker 1.5s infinite; }
          @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          .noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: url('https://grainy-gradients.vercel.app/noise.svg'); opacity: 0.15; pointer-events: none; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container fade-in">
      <div className="noise"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <nav className="top-nav">
        <div className="logo">SEC_PROTO // 2026</div>
        <div className="status-indicator"><span className="dot"></span> <span className="status-text">SYSTEM ACTIVE</span></div>
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
            <button className="minimal-back" onClick={() => setCurrentPage('home')}>← BACK</button>
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
              <span className="node-id">NODE_{currentQuestion + 1} / {quizQuestions.length}</span>
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
                    {showFeedback && i === quizQuestions[currentQuestion].correctAnswer && (
                      <span className="check-mark">✓</span>
                    )}
                    {showFeedback && selectedAnswer === i && i !== quizQuestions[currentQuestion].correctAnswer && (
                      <span className="x-mark">✗</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {showFeedback && (
              <div className="feedback-drawer fade-in">
                {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                  <div className="feedback-correct">
                    <div className="feedback-status">✓ CORRECT</div>
                    <p className="explainer">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                ) : (
                  <div className="feedback-incorrect">
                    <div className="feedback-status danger">✗ INCORRECT</div>
                    <div className="correct-answer-box">
                      <strong>CORRECT ANSWER:</strong> {quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}
                    </div>
                    <p className="explainer">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
                <button className="mega-button" onClick={handleNextQuestion}>
                  {currentQuestion < quizQuestions.length - 1 ? 'NEXT PROTOCOL' : 'VIEW RESULTS'}
                </button>
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
                      <h3>STATUS</h3>
                      <p className="status-rank">
                        {score >= 13 ? "EXPERT" : score >= 10 ? "CERTIFIED" : score >= 7 ? "PROFICIENT" : "UNVERIFIED"}
                      </p>
                      <div className="stat-row">
                         <span>SCORE:</span> <strong>{score} / {quizQuestions.length}</strong>
                      </div>
                      <div className="stat-row">
                         <span>ACCURACY:</span> <strong>{Math.round((score/quizQuestions.length)*100)}%</strong>
                      </div>
                   </div>
                </div>
                <div className="id-footer">ISSUED: JAN 2026</div>
             </div>
             <button className="mega-button secondary" onClick={() => window.location.reload()}>RE-INITIALIZE</button>
          </section>
        )}
      </main>

      <style>{`
        /* RESPONSIVE BASE */
        :root { --accent: #00FFD1; --bg: #0A0A0A; --text: #FFFFFF; --dim: #666666; --card-bg: rgba(255, 255, 255, 0.03); --danger: #FF3E3E; }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { font-family: 'Jost', sans-serif; background-color: var(--bg); color: var(--text); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        
        .app-container { min-height: 100vh; padding: clamp(40px, 10vh, 100px) clamp(20px, 5vw, 60px); display: flex; flex-direction: column; align-items: center; position: relative; }
        
        .content { width: 100%; max-width: 1200px; position: relative; z-index: 10; }

        /* NAV */
        .top-nav { position: fixed; top: 0; width: 100%; padding: clamp(15px, 3vh, 40px) clamp(20px, 5vw, 60px); display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 2px; font-weight: 600; z-index: 100; background: linear-gradient(to bottom, var(--bg) 0%, transparent 100%); }
        .dot { display: inline-block; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; margin-right: 8px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* TITLES */
        .main-title { font-size: clamp(3.5rem, 12vw, 8rem); font-weight: 900; line-height: 0.9; letter-spacing: -2px; margin-bottom: 2rem; }
        .outline { -webkit-text-stroke: 1px white; color: transparent; }
        .hero-description { max-width: 600px; font-size: clamp(1rem, 2vw, 1.25rem); color: var(--dim); font-weight: 300; margin-bottom: clamp(3rem, 8vh, 6rem); line-height: 1.6; }

        /* GRID */
        .action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: clamp(20px, 4vw, 40px); }
        
        .card-box { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.1); padding: clamp(30px, 5vw, 60px); cursor: pointer; transition: 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .card-box:hover { background: rgba(255,255,255,0.08); border-color: var(--accent); transform: translateY(-5px); }
        .card-header { font-size: 0.8rem; color: var(--dim); margin-bottom: 1rem; }
        .card-box h3 { font-size: clamp(1.3rem, 3vw, 1.8rem); margin-bottom: 1rem; font-weight: 600; }
        .arrow-link { margin-top: 2rem; color: var(--accent); font-size: 0.9rem; font-weight: 600; }

        /* QUIZ */
        .quiz-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; font-size: 0.85rem; color: var(--dim); letter-spacing: 1px; }
        .bar-track { flex: 1; height: 3px; background: rgba(255,255,255,0.1); margin-left: 20px; }
        .bar-fill { height: 100%; background: var(--accent); transition: width 0.3s ease; }
        
        .question-block { margin-bottom: 3rem; }
        .quiz-question { font-size: clamp(1.8rem, 5vw, 3rem); margin-bottom: clamp(2rem, 5vh, 4rem); font-weight: 600; line-height: 1.2; }
        
        .opt-btn { width: 100%; background: none; border: 1px solid rgba(255,255,255,0.1); padding: clamp(20px, 3vw, 30px); color: white; display: flex; align-items: center; gap: 20px; font-size: clamp(1rem, 2vw, 1.2rem); font-family: 'Jost'; cursor: pointer; transition: 0.2s; margin-bottom: 12px; text-align: left; position: relative; }
        .opt-btn:hover:not(:disabled) { background: rgba(255,255,255,0.05); border-color: var(--accent); }
        .opt-btn.success { border-color: var(--accent); background: rgba(0,255,209,0.05); }
        .opt-btn.danger { border-color: var(--danger); background: rgba(255,62,62,0.05); }
        .opt-btn:disabled { cursor: not-allowed; }
        
        .opt-index { font-size: 0.8rem; color: var(--dim); font-weight: 600; }
        .opt-label { flex: 1; }
        .check-mark, .x-mark { font-size: 1.5rem; font-weight: 900; margin-left: auto; }
        .check-mark { color: var(--accent); }
        .x-mark { color: var(--danger); }

        /* FEEDBACK */
        .feedback-drawer { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: clamp(25px, 4vw, 40px); margin-top: 2rem; }
        .feedback-status { font-size: 0.9rem; font-weight: 900; letter-spacing: 2px; margin-bottom: 1rem; color: var(--accent); }
        .feedback-status.danger { color: var(--danger); }
        .correct-answer-box { background: rgba(0,255,209,0.1); border: 1px solid var(--accent); padding: 15px 20px; margin: 1.5rem 0; font-size: 1rem; }
        .correct-answer-box strong { color: var(--accent); display: block; margin-bottom: 0.5rem; font-size: 0.85rem; letter-spacing: 1px; }
        .explainer { font-size: clamp(0.95rem, 2vw, 1.1rem); line-height: 1.7; color: rgba(255,255,255,0.8); }

        /* FORMS */
        .minimal-back { background: none; border: none; color: var(--dim); font-family: 'Jost'; font-size: 0.9rem; cursor: pointer; margin-bottom: 2rem; transition: 0.2s; padding: 0; }
        .minimal-back:hover { color: white; }
        
        .form-container { max-width: 600px; margin: 0 auto; }
        .section-title { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900; margin-bottom: 2rem; }
        
        .stars-wrapper { display: flex; gap: 10px; margin-bottom: 3rem; }
        .big-star { background: none; border: none; font-size: clamp(2rem, 8vw, 3.5rem); color: #333; cursor: pointer; transition: 0.2s; }
        .big-star.active { color: var(--accent); }
        .big-star:hover { transform: scale(1.1); }
        
        .input-group { margin-bottom: 2rem; }
        .input-group label { display: block; font-size: 0.85rem; letter-spacing: 1px; color: var(--dim); margin-bottom: 1rem; }
        textarea { width: 100%; background: #111; border: 1px solid #333; color: white; padding: 20px; font-family: 'Jost'; font-size: 1.1rem; resize: none; outline: none; }
        textarea:focus { border-color: var(--accent); }

        /* BUTTONS */
        .mega-button { width: 100%; max-width: 400px; background: white; color: black; border: none; padding: 20px 40px; font-weight: 900; font-family: 'Jost'; font-size: 1rem; letter-spacing: 2px; cursor: pointer; margin-top: 30px; transition: 0.3s; }
        .mega-button:hover:not(:disabled) { background: var(--accent); transform: scale(1.02); }
        .mega-button:disabled { opacity: 0.3; cursor: not-allowed; }
        .mega-button.secondary { background: transparent; color: white; border: 1px solid #333; }
        .mega-button.secondary:hover { border-color: var(--accent); background: rgba(0,255,209,0.05); }

        /* RESULTS ID CARD */
        .results-view { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .id-card { background: #0F0F0F; border: 1px solid #222; padding: clamp(20px, 5vw, 40px); width: 100%; max-width: 500px; }
        .id-header { font-size: 0.75rem; letter-spacing: 2px; color: var(--dim); padding-bottom: 15px; border-bottom: 1px solid #222; }
        .id-body { display: flex; flex-direction: row; gap: 20px; align-items: center; padding: 30px 0; border-bottom: 1px solid #222; }
        .id-avatar { width: 80px; height: 80px; border: 1px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: var(--accent); flex-shrink: 0; }
        .id-info h3 { font-size: 0.8rem; color: var(--dim); margin-bottom: 0.5rem; letter-spacing: 1px; }
        .status-rank { font-size: clamp(1.2rem, 3vw, 1.8rem); font-weight: 900; color: var(--accent); margin-bottom: 1rem; }
        .stat-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; color: rgba(255,255,255,0.7); }
        .stat-row strong { color: white; }
        .id-footer { padding-top: 15px; font-size: 0.7rem; color: var(--dim); letter-spacing: 1px; }

        /* ANIMATIONS & ORBS */
        .scan-line { position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--accent), transparent); transform: translateX(-100%); opacity: 0; }
        .scan-line.active { animation: scan 1.2s ease-out; }
        @keyframes scan { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
        
        .orb { position: fixed; width: clamp(300px, 60vw, 600px); height: clamp(300px, 60vw, 600px); border-radius: 50%; filter: blur(100px); opacity: 0.1; z-index: -1; }
        .orb-1 { background: var(--accent); top: -10%; right: -10%; }
        .orb-2 { background: #7000FF; bottom: -10%; left: -10%; }
        
        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        /* MOBILE TWEAKS */
        @media (max-width: 600px) {
          .top-nav { background: var(--bg); }
          .status-text { display: none; }
          .id-body { flex-direction: column; text-align: center; }
          .action-grid { grid-template-columns: 1fr; }
          .app-container { padding-top: 80px; }
          .stars-wrapper { justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default CybersecurityFeedbackApp;