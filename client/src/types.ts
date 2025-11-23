export interface VocabEntry {
  word: string;
  definition: string;
  example: string;
}

export type QuestionType = 'word-to-definition' | 'definition-to-word';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
  correctAnswer: string;
  example: string;
  type: QuestionType;
  word: string; // The word this question is about
}


