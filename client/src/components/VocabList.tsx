import React from 'react';
import { Book, Quote, Volume2 } from 'lucide-react';
import type { VocabEntry } from '../types';

interface VocabListProps {
  vocabList: VocabEntry[];
  limit?: number;
}

const VocabList: React.FC<VocabListProps> = ({ vocabList, limit }) => {
  const displayList = limit ? vocabList.slice(0, limit) : vocabList;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (vocabList.length === 0) {
    return (
      <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-xl dark:bg-slate-900 dark:border-slate-800">
        <Book className="w-10 h-10 text-gray-400 mx-auto mb-3 dark:text-slate-600" />
        <p className="text-gray-500 dark:text-slate-400">Chưa có từ vựng nào. Hãy thêm từ mới!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayList.map((entry, index) => (
        <div
          key={entry.word}
          className="group p-4 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {entry.word}
            </h3>
            <button
              onClick={() => speak(entry.word)}
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
              title="Nghe phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-600 mb-3 text-sm line-clamp-2 dark:text-slate-400">
            {entry.definition}
          </p>

          <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-slate-800">
            <Quote className="w-3 h-3 text-gray-400 flex-shrink-0 mt-1 dark:text-slate-500" />
            <p className="text-xs text-gray-500 italic dark:text-slate-500">
              {entry.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VocabList;

