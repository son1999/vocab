import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 w-full max-w-5xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

