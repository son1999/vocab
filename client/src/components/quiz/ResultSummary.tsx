import { Trophy, RefreshCw, XCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { QuizQuestion } from '../../types';

interface ResultSummaryProps {
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  userAnswers: { questionIndex: number; isCorrect: boolean }[];
  onRestart: () => void;
}

export default function ResultSummary({ score, totalQuestions, questions, userAnswers, onRestart }: ResultSummaryProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  // Find incorrect questions based on userAnswers
  const incorrectIndices = userAnswers
    .filter(a => !a.isCorrect)
    .map(a => a.questionIndex);

  const incorrectQuestions = questions.filter((_, index) => incorrectIndices.includes(index));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 text-center border-b border-border">
          <div className="inline-flex p-3 bg-yellow-900/20 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Hoàn thành!</h2>
          <p className="text-muted-foreground mb-6">Bạn đã hoàn thành bài kiểm tra</p>

          <div className="flex justify-center items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-foreground">
              {score}
            </span>
            <span className="text-xl text-muted-foreground font-medium mb-1">/ {totalQuestions}</span>
          </div>
          <p className="text-muted-foreground font-medium">
            {percentage >= 80 ? 'Xuất sắc! 🎉' : percentage >= 50 ? 'Làm tốt lắm! 👍' : 'Cố gắng hơn nhé! 💪'}
          </p>
        </div>

        <div className="p-6 bg-muted/30">
          {incorrectQuestions.length > 0 ? (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 text-red-500">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="font-bold text-sm">Cần ôn tập lại ({incorrectQuestions.length})</h3>
              </div>

              <div className="space-y-3">
                {incorrectQuestions.map((q, index) => (
                  <div key={index} className="p-3 bg-card border border-border rounded-lg text-left">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground text-sm mb-1">{q.word}</p>
                        <p className="text-muted-foreground text-sm mb-1">{q.correctAnswer}</p>
                        {q.example && (
                          <p className="text-xs italic text-muted-foreground">
                            "{q.example}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/20 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <h3 className="font-bold text-green-400 text-sm">Tuyệt vời!</h3>
                <p className="text-green-300 text-sm">Bạn đã trả lời đúng tất cả câu hỏi.</p>
              </div>
            </div>
          )}

          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Làm bài mới
          </button>
        </div>
      </div>
    </div>
  );
}

