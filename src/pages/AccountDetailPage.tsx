import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Account } from '../types/Account';
import { sampleAccounts } from '../mocks/accounts';

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account] = useState<Account | undefined>(
    sampleAccounts.find((acc) => acc.id === id)
  );

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">계좌를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/accounts')} className="text-blue-600 text-sm hover:underline">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <button onClick={() => navigate('/accounts')} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">계좌 상세</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-lg">{account.accountName}</h2>
                <p className="text-blue-200 text-sm tracking-wider">{account.accountNumber}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              account.isActive
                ? 'bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30'
                : 'bg-white/10 text-blue-200 ring-1 ring-white/20'
            }`}>
              {account.isActive ? '활성' : '비활성'}
            </span>
          </div>
          <div className="pt-3 border-t border-white/10">
            <p className="text-blue-200 text-xs mb-1">잔액</p>
            <p className="text-3xl font-bold tracking-tight">
              {account.balance.toLocaleString()}
              <span className="text-lg font-medium text-blue-200 ml-1">원</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">계좌 정보</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="flex justify-between px-6 py-3.5">
              <span className="text-sm text-gray-500">계좌명</span>
              <span className="text-sm font-medium text-gray-900">{account.accountName}</span>
            </div>
            <div className="flex justify-between px-6 py-3.5">
              <span className="text-sm text-gray-500">계좌번호</span>
              <span className="text-sm font-medium text-gray-900 tracking-wider">{account.accountNumber}</span>
            </div>
            <div className="flex justify-between px-6 py-3.5">
              <span className="text-sm text-gray-500">잔액</span>
              <span className="text-sm font-medium text-gray-900">{account.balance.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between px-6 py-3.5">
              <span className="text-sm text-gray-500">상태</span>
              <span className={`text-sm font-medium ${account.isActive ? 'text-emerald-600' : 'text-red-500'}`}>
                {account.isActive ? '활성' : '비활성'}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
