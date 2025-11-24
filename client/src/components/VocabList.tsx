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
      <div className="text-center py-12 bg-card border border-dashed border-border rounded-xl">
        <Book className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Chưa có từ vựng nào. Hãy thêm từ mới!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayList.map((entry) => (
        <div
          key={entry.word}
          className="group p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-sm transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-foreground">
              {entry.word}
            </h3>
            <button
              onClick={() => speak(entry.word)}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              title="Nghe phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-muted-foreground mb-3 text-sm line-clamp-2">
            {entry.definition}
          </p>

          <div className="flex gap-2 pt-3 border-t border-border">
            <Quote className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
            <p className="text-xs text-muted-foreground italic">
              {entry.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VocabList;

