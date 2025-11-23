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
    <form onSubmit={handleSubmit} className="p-6 bg-white border-2 border-gray-300 rounded-xl shadow-sm mb-8 dark:bg-slate-900 dark:border-slate-800">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900 dark:text-slate-100">
        <div className="p-1.5 bg-gray-200 rounded-md dark:bg-slate-800">
          <Plus className="w-4 h-4 text-gray-700 dark:text-slate-400" />
        </div>
        Thêm từ vựng mới
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 ml-1 dark:text-slate-400">Từ vựng</label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Ví dụ: Serendipity"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-slate-600 dark:focus:ring-slate-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 ml-1 dark:text-slate-400">Định nghĩa</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Nghĩa của từ..."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-slate-600 dark:focus:ring-slate-600"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 ml-1 dark:text-slate-400">Ví dụ</label>
          <div className="relative">
            <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Đặt câu ví dụ..."
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-slate-600 dark:focus:ring-slate-600"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-4 py-2.5 font-semibold text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        Thêm vào danh sách
      </button>
    </form>
  );
};

export default AddVocabForm;
