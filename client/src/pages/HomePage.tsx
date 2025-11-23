import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import AddVocabForm from '../components/AddVocabForm';
import VocabList from '../components/VocabList';
import type { VocabEntry } from '../types';

// Base URL API; override with VITE_API_URL in .env if needed
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/vocab';

export default function HomePage() {
  const [vocabList, setVocabList] = useState<VocabEntry[]>([]);

  // Hàm để lấy danh sách từ vựng từ backend
  const fetchVocab = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVocabList(data);
    } catch (error) {
      console.error('Lỗi khi tải từ vựng:', error);
      alert('Không thể kết nối tới máy chủ. Hãy đảm bảo backend đang chạy.');
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchVocab();
  }, []);

  // Hàm để xử lý việc thêm từ vựng mới
  const handleAddVocab = async (entry: Omit<VocabEntry, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (response.ok) {
        fetchVocab(); // Tải lại danh sách sau khi thêm thành công
      } else {
        alert('Lỗi khi thêm từ vựng. Vui lòng thử lại.');
        console.error('Lỗi khi thêm từ vựng');
      }
    } catch (error) {
      console.error('Lỗi khi thêm từ vựng:', error);
      alert('Không thể gửi yêu cầu đến máy chủ.');
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight dark:text-white mb-2">
            Sổ tay từ vựng
          </h1>
          <p className="text-gray-600 dark:text-slate-300">Quản lý và theo dõi hành trình học tập của bạn</p>
        </div>

        <a
          href={`${API_URL}/file`}
          download
          className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm border border-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
        >
          <Download className="w-4 h-4" />
          <span>Tải xuống Excel</span>
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <AddVocabForm onAdd={handleAddVocab} />
        </div>
        <div className="md:col-span-1">
          <div className="h-full p-6 bg-white border-2 border-gray-300 rounded-xl flex flex-col justify-center items-center text-center dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-gray-600 font-medium mb-2 dark:text-slate-400">Tổng số từ vựng</h3>
            <span className="text-5xl font-bold text-gray-900 mb-2 dark:text-white">{vocabList.length}</span>
            <p className="text-xs text-gray-500 dark:text-slate-500">từ đã lưu</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Từ vựng mới nhất</h2>
        <span className="text-sm text-gray-500 dark:text-slate-400">Hiển thị 3 từ gần đây</span>
      </div>

      <VocabList vocabList={vocabList} limit={3} />
    </>
  );
}
