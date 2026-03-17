import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createAccount } from '../api/accountApi';

export default function AccountCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    accountName: '',
    accountNumber: '',
    balance: 0,
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createAccount(form);
      navigate('/accounts');
    } catch {
      setError('계좌 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/accounts')}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">계좌 등록</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6">
        {/* 에러 배너 */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg ring-1 ring-red-200">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 className="font-bold text-blue-900">새 계좌 정보</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                계좌명
              </label>
              <input
                name="accountName"
                placeholder="예: IBK 급여통장"
                value={form.accountName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                계좌번호
              </label>
              <input
                name="accountNumber"
                placeholder="예: 049-XX-XXXXXX"
                value={form.accountNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                잔액
              </label>
              <input
                name="balance"
                type="number"
                placeholder="0"
                value={form.balance}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? '등록 중...' : '등록'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/accounts')}
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
