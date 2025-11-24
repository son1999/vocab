import React, { useState } from 'react';
import { Plus, Type, BookOpen, Quote } from 'lucide-react';
import type { VocabEntry } from '../types';

interface AddVocabFormProps {
  onAdd: (entry: Omit<VocabEntry, 'id'>) => void;
}

const AddVocabForm: React.FC<AddVocabFormProps> = ({ onAdd }) => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || !definition || !example) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    onAdd({ word, definition, example });
    setWord('');
    setDefinition('');
    setExample('');
  };

  return (

    <form onSubmit={handleSubmit} className="p-6 bg-card border border-border rounded-xl shadow-sm mb-8">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-foreground">
        <div className="p-1.5 bg-muted rounded-md">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </div>
        Thêm từ vựng mới
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground ml-1">Từ vựng</label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ví dụ: Serendipity"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground ml-1">Định nghĩa</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nghĩa của từ..."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground ml-1">Ví dụ</label>
          <div className="relative">
            <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Đặt câu ví dụ..."
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-all"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-4 py-2.5 font-semibold text-sm text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
      >
        Thêm vào danh sách
      </button>
    </form>
  );
};

export default AddVocabForm;
