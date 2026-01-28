// types.ts
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Answer {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export type PageType = "home" | "review" | "quiz";

export interface HomePageProps {
  setCurrentPage: (page: PageType) => void;
  setQuizStarted: (started: boolean) => void;
}

export interface ReviewPageProps {
  setCurrentPage: (page: PageType) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  rating: number;
  setRating: (rating: number) => void;
  review: string;
  setReview: (review: string) => void;
  handleRatingSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setQuizStarted: (started: boolean) => void;
}

export interface QuizPageProps {
  setCurrentPage: (page: PageType) => void;
  quizStarted: boolean;
  handleAnswerSelect: (answerIndex: number) => void;
  handleNextQuestion: () => void;
  resetQuiz: () => void;
  currentQuestion: number;
  score: number;
  answers: Answer[];
  showResults: boolean;
  selectedAnswer: number | null;
  showFeedback: boolean;
  quizQuestions: QuizQuestion[];
  setShowResults: (show: boolean) => void;
  setQuizStarted: (started: boolean) => void;
}