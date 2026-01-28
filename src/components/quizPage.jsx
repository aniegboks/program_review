import React from "react";

const QuizPage = ({
  setCurrentPage, quizStarted, handleAnswerSelect, handleNextQuestion, resetQuiz,
  currentQuestion, score, answers, showResults, selectedAnswer, showFeedback, quizQuestions, setQuizStarted
}) => {
  // 1. INTRO VIEW
  if (!quizStarted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <h1 className="text-4xl font-black mb-4">Ready?</h1>
          <p className="text-slate-500 mb-12 text-lg">10 Questions • Instant Feedback • No Time Limit</p>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-600 transition-all shadow-xl" onClick={() => setQuizStarted(true)}>Start Quiz</button>
          <button className="mt-6 text-slate-400 font-bold block mx-auto hover:text-rose-500" onClick={() => setCurrentPage("home")}>Wait, take me back</button>
        </div>
      </div>
    );
  }

  // 2. RESULTS VIEW
  if (showResults) {
    const percent = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="space-y-8 pb-20">
        <div className="bg-white p-12 rounded-[3rem] text-center border border-slate-100 shadow-sm">
          <h1 className="text-3xl font-bold mb-8">Results</h1>
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-[10px] border-indigo-50 text-indigo-600 text-4xl font-black mb-6">
            {percent}%
          </div>
          <p className="text-xl font-bold mb-10 text-slate-700">You scored {score} out of {quizQuestions.length}</p>
          <div className="flex gap-4">
            <button className="flex-1 bg-slate-100 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all" onClick={resetQuiz}>Retake</button>
            <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100" onClick={() => setCurrentPage("home")}>Finish</button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 pl-4">Review Answers</h3>
          {quizQuestions.map((q, i) => {
            const userAns = answers.find(a => a.questionIndex === i);
            return (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${userAns?.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {userAns?.isCorrect ? '✓' : '✗'}
                </div>
                <div>
                  <p className="font-bold mb-1">{q.question}</p>
                  <p className="text-sm text-slate-500 italic">Correct: {q.options[q.correctAnswer]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. ACTIVE QUESTION VIEW
  const question = quizQuestions[currentQuestion];
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Question {currentQuestion + 1} of {quizQuestions.length}</span>
        <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-10 leading-tight">{question.question}</h2>
        <div className="grid gap-4">
          {question.options.map((option, index) => {
            let style = "border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200";
            if (showFeedback) {
              if (index === question.correctAnswer) style = "border-emerald-500 bg-emerald-50 text-emerald-700";
              else if (selectedAnswer === index) style = "border-rose-500 bg-rose-50 text-rose-700";
              else style = "opacity-40 border-slate-100 bg-slate-50";
            } else if (selectedAnswer === index) style = "border-indigo-500 bg-indigo-50 text-indigo-700";

            return (
              <button
                key={index} disabled={showFeedback} onClick={() => handleAnswerSelect(index)}
                className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${style}`}
              >
                <span className="w-8 h-8 rounded-lg bg-white border border-inherit flex items-center justify-center text-xs">{String.fromCharCode(65+index)}</span>
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-10 p-8 rounded-3xl bg-slate-900 text-white animate-in slide-in-from-top-4">
            <p className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-2">Explanation</p>
            <p className="text-slate-300 mb-8 leading-relaxed">{question.explanation}</p>
            <button className="w-full bg-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all" onClick={handleNextQuestion}>
              {currentQuestion < quizQuestions.length - 1 ? "Next Question →" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;