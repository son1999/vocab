import { NavLink } from 'react-router-dom';
import { Book, Brain, GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-900 rounded-lg dark:bg-slate-800">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight dark:text-white">
              VocabMaster
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center p-1 bg-gray-200 rounded-lg dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700/50">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200'}
                `}
              >
                <Book className="w-4 h-4" />
                <span>Sổ tay</span>
              </NavLink>
              <NavLink
                to="/quiz"
                className={({ isActive }) => `
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200'}
                `}
              >
                <Brain className="w-4 h-4" />
                <span>Ôn tập</span>
              </NavLink>
            </div>

            <div className="w-px h-6 bg-gray-300 dark:bg-slate-800 mx-1"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
              title={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

