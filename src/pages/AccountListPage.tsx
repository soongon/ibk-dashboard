import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getAccounts } from '../api/accountApi';
import { useAuthStore } from '../stores/useAuthStore';
import { Account } from '../types/Account';
import AccountCard from '../components/AccountCard';

export default function AccountListPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const fetchAccounts = () => {
    setLoading(true);
    setError('');
    getAccounts()
      .then(setAccounts)
      .catch(() => setError('계좌 목록을 불러오는 데 실패했습니다.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAccounts(); }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeCount = accounts.filter((acc) => acc.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
              </svg>
            </div>
            <h1 className="text-lg font-bold">IBK 계좌 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm">{username}님</span>
            </div>
            <button onClick={handleLogout} className="text-sm text-blue-200 hover:text-white transition-colors">로그아웃</button>
          </div>
        </div>
      </header>

      {!loading && !error && accounts.length > 0 && (
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-6 grid grid-cols-3 divide-x divide-gray-100">
            <div className="text-center px-4">
              <p className="text-xs text-gray-400 mb-1">총 계좌</p>
              <p className="text-2xl font-bold text-gray-900">{accounts.length}<span className="text-sm font-normal text-gray-400 ml-0.5">개</span></p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-gray-400 mb-1">활성 계좌</p>
              <p className="text-2xl font-bold text-emerald-600">{activeCount}<span className="text-sm font-normal text-gray-400 ml-0.5">개</span></p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-gray-400 mb-1">총 잔액</p>
              <p className="text-2xl font-bold text-blue-900">{totalBalance.toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-0.5">원</span></p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">계좌 목록</h2>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-blue-200 border-t-blue-900 rounded-full animate-spin mb-3" />
            <p className="text-gray-400 text-sm">계좌 정보를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-xl border border-red-200">
            <svg className="w-12 h-12 text-red-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-red-500 font-medium mb-1">{error}</p>
            <p className="text-gray-400 text-sm mb-4">json-server가 실행 중인지 확인해주세요.</p>
            <button onClick={fetchAccounts} className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors ring-1 ring-red-200">
              다시 시도
            </button>
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 mb-1">등록된 계좌가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {accounts.map((acc) => (
              <Link key={acc.id} to={`/accounts/${acc.id}`} className="block">
                <AccountCard account={acc} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
