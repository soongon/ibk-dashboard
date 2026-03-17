import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginPage() {
  const [input, setInput] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    login(input.trim());
    navigate('/accounts');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">IBK 대시보드</h1>
          <p className="text-gray-500 text-sm mt-1">계좌 관리 시스템</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="사용자 이름을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
