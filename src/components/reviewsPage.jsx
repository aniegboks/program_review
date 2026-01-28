import React from "react";

const ReviewPage = ({ 
  setCurrentPage, submitted, setSubmitted, rating, setRating, 
  review, setReview, handleRatingSubmit, setQuizStarted 
}) => (
  <div className="max-w-2xl mx-auto py-8">
    <button onClick={() => setCurrentPage('home')} className="mb-8 font-bold text-slate-400 hover:text-indigo-600 transition-colors">
      ← BACK TO HOME
    </button>

    {!submitted ? (
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold mb-2">How did we do?</h1>
        <p className="text-slate-500 mb-10">Help us improve the training experience.</p>

        <form onSubmit={handleRatingSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Your Rating</label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star} type="button"
                  className={`text-4xl transition-all ${rating >= star ? 'text-amber-400 scale-110' : 'text-slate-200 hover:text-amber-200'}`}
                  onClick={() => setRating(star)}
                > ★ </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Written Review</label>
            <textarea
              className="w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
              value={review} onChange={(e) => setReview(e.target.value)}
              placeholder="What did you think of the session?" rows={5} required
            />
          </div>

          <button 
            type="submit" disabled={rating === 0 || !review.trim()}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-30 transition-all"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    ) : (
      <div className="bg-white rounded-[2rem] p-16 text-center border border-slate-100 shadow-xl">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
        <h2 className="text-3xl font-bold mb-4">Submission Received</h2>
        <p className="text-slate-500 mb-10">Thank you for your valuable feedback!</p>
        <div className="flex flex-col gap-4">
          <button className="bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all" onClick={() => { setCurrentPage('quiz'); setQuizStarted(true); }}>Take the Quiz</button>
          <button className="text-slate-400 font-bold text-sm hover:text-indigo-600" onClick={() => { setSubmitted(false); setRating(0); setReview(''); }}>Submit another review</button>
        </div>
      </div>
    )}
  </div>
);

export default ReviewPage;