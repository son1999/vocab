import { useState, useEffect } from 'react';
import { Check, X, ArrowRight, HelpCircle, Volume2 } from 'lucide-react';
import type { QuizQuestion } from '../../types';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer, onNext }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (optionText: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(optionText);
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const getButtonClass = (optionText: string, isCorrect: boolean) => {
    if (!isAnswered) {
      return 'bg-card border-border hover:bg-muted hover:border-primary/50';
    }
    if (optionText === selectedAnswer) {
      return isCorrect
        ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-500/50 dark:text-green-400'
        : 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-400';
    }
    if (isCorrect) {
      return 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-500/50 dark:text-green-400';
    }
    return 'bg-muted border-border opacity-50';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Tiến độ</span>
          <span className="text-xs font-bold text-foreground">{questionNumber} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-muted rounded-lg">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">
                {question.type === 'word-to-definition' ? 'Định nghĩa' : 'Từ vựng'}
              </p>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  {question.questionText}
                </h2>
                {question.type === 'definition-to-word' && (
                  <button
                    onClick={() => speak(question.questionText)}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    title="Nghe câu hỏi"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {question.options.map((option) => (
              <button
                key={option.text}
                onClick={() => handleOptionClick(option.text, option.isCorrect)}
                disabled={isAnswered}
                className={`group relative w-full text-left p-3.5 rounded-lg border transition-all duration-200 ${getButtonClass(option.text, option.isCorrect)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-foreground">{option.text}</span>
                  {isAnswered && option.isCorrect && <Check className="w-4 h-4 text-green-600 dark:text-green-500" />}
                  {isAnswered && !option.isCorrect && option.text === selectedAnswer && <X className="w-4 h-4 text-red-600 dark:text-red-500" />}
                </div>
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-6 pt-6 border-t border-border animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className={`p-3 rounded-lg mb-4 text-sm ${selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-100 dark:bg-green-900/10 dark:border-green-500/20' : 'bg-red-50 border border-red-100 dark:bg-red-900/10 dark:border-red-500/20'}`}>
                <h3 className={`font-bold mb-1 ${selectedAnswer === question.correctAnswer ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {selectedAnswer === question.correctAnswer ? 'Chính xác!' : 'Chưa chính xác!'}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-foreground">
                    <span className="font-semibold">{question.word}</span>: {question.correctAnswer}
                  </p>
                  <button
                    onClick={() => speak(question.word)}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                {question.example && (
                  <p className="mt-1.5 text-xs italic text-muted-foreground border-l-2 border-border pl-2">
                    "{question.example}"
                  </p>
                )}
              </div>

              <button
                onClick={onNext}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

