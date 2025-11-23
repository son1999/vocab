import { useState, useEffect, useCallback } from 'react';
import type { VocabEntry, QuizQuestion } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/vocab';

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function useQuiz(questionCount = 10) {
  const [vocabList, setVocabList] = useState<VocabEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const fetchVocab = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch vocabulary.');
      const data = await response.json();
      // Filter out entries with missing word or definition
      const validVocab = data.filter(
        (v: VocabEntry) => v.word?.trim() && v.definition?.trim()
      );
      setVocabList(validVocab);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVocab();
  }, [fetchVocab]);

  const generateQuestions = useCallback(() => {
    if (vocabList.length < 4) {
      setError('Cần tối thiểu 4 mục từ vựng để bắt đầu ôn tập.');
      return;
    }

    const shuffledVocab = shuffleArray(vocabList);
    const newQuestions: QuizQuestion[] = [];

    for (let i = 0; i < Math.min(questionCount, shuffledVocab.length); i++) {
      const correctEntry = shuffledVocab[i];
      const type = Math.random() > 0.5 ? 'word-to-definition' : 'definition-to-word';

      const distractors = shuffleArray(vocabList.filter(v => v.word !== correctEntry.word)).slice(0, 3);

      const options = shuffleArray([
        { text: type === 'word-to-definition' ? correctEntry.definition : correctEntry.word, isCorrect: true },
        ...distractors.map(d => ({ text: type === 'word-to-definition' ? d.definition : d.word, isCorrect: false }))
      ]);

      newQuestions.push({
        questionText: type === 'word-to-definition' ? correctEntry.word : correctEntry.definition,
        options,
        correctAnswer: type === 'word-to-definition' ? correctEntry.definition : correctEntry.word,
        example: correctEntry.example,
        type,
        word: correctEntry.word,
      });
    }
    setQuestions(newQuestions);
  }, [vocabList, questionCount]);

  const [userAnswers, setUserAnswers] = useState<{ questionIndex: number; isCorrect: boolean }[]>([]);

  const startQuiz = () => {
    generateQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setIsQuizOver(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
    setUserAnswers(prev => [...prev, { questionIndex: currentQuestionIndex, isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  // Load from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const { questions, currentQuestionIndex, score, isQuizOver, userAnswers } = JSON.parse(savedState);
      setQuestions(questions);
      setCurrentQuestionIndex(currentQuestionIndex);
      setScore(score);
      setIsQuizOver(isQuizOver);
      setUserAnswers(userAnswers || []);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (questions.length > 0) {
      const stateToSave = {
        questions,
        currentQuestionIndex,
        score,
        isQuizOver,
        userAnswers,
      };
      localStorage.setItem('quizState', JSON.stringify(stateToSave));
    }
  }, [questions, currentQuestionIndex, score, isQuizOver, userAnswers]);

  return {
    isLoading,
    error,
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    score,
    isQuizOver,
    userAnswers,
    startQuiz,
    handleAnswer,
    nextQuestion,
    totalQuestions: questions.length,
    fetchVocab, // Expose fetchVocab for retry functionality
  };
}

