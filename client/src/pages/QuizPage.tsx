import { useState } from 'react';
import { Brain, Play, RefreshCw, AlertCircle } from 'lucide-react';
import { useQuiz } from '../hooks/useQuiz';
import QuestionCard from '../components/quiz/QuestionCard';
import ResultSummary from '../components/quiz/ResultSummary';

const QUESTION_COUNTS = [5, 10, 20];

export default function QuizPage() {
  const [questionCount, setQuestionCount] = useState(10);
  const {
    isLoading,
    error,
    questions,
    currentQuestion,
    currentQuestionIndex,
    score,
    isQuizOver,
    startQuiz,
    handleAnswer,
    nextQuestion,
    totalQuestions,
    userAnswers,
    fetchVocab,
  } = useQuiz(questionCount);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="p-4 bg-red-500/10 rounded-full mb-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <p className="text-red-400 mb-6 text-lg">{error}</p>
        <button
          onClick={() => fetchVocab()}
          className="flex items-center gap-2 px-6 py-3 font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!currentQuestion && !isQuizOver ? (
        <div className="max-w-md mx-auto text-center py-12">
          <div className="inline-flex p-3 bg-muted rounded-full mb-6">
            <Brain className="w-8 h-8 text-foreground" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Ôn tập từ vựng</h1>
          <p className="text-muted-foreground mb-8">Chọn số lượng câu hỏi để bắt đầu</p>

          <div className="flex justify-center gap-3 mb-8">
            {QUESTION_COUNTS.map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${questionCount === count
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:bg-muted'
                  }`}
              >
                {count}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Bắt đầu ngay</span>
          </button>
        </div>
      ) : isQuizOver ? (
        <ResultSummary
          score={score}
          totalQuestions={totalQuestions}
          userAnswers={userAnswers}
          questions={questions}
          onRestart={startQuiz}
        />
      ) : currentQuestion ? (
        <div className="max-w-4xl mx-auto">
          <QuestionCard
            key={currentQuestion.questionText}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
          />
        </div>
      ) : null}
    </div>
  );
}
