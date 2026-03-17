import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getAccount, updateAccount, deleteAccount } from '../api/accountApi';
import { Account } from '../types/Account';

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ accountName: '', balance: 0 });
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    setLoadError('');
    getAccount(id!)
      .then((data) => {
        setAccount(data);
        setForm({ accountName: data.accountName, balance: data.balance });
      })
      .catch(() => setLoadError('계좌 정보를 불러오는 데 실패했습니다.'));
  }, [id]);

  const handleSave = async () => {
    if (!account) return;
    setError('');
    try {
      const updated = await updateAccount(account.id, form);
      setAccount(updated);
      setIsEditing(false);
    } catch {
      setError('계좌 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDelete = async () => {
    if (!account) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setError('');
    try {
      await deleteAccount(account.id);
      navigate('/accounts');
    } catch {
      setError('계좌 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 로딩 중
  if (!account && !loadError)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-200 border-t-blue-900 rounded-full animate-spin mb-3" />
          <p className="text-gray-400 text-sm">계좌 정보를 불러오는 중...</p>
        </div>
      </div>
    );

  // 조회 에러
  if (loadError)
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
            <button
              onClick={() => navigate('/accounts')}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 className="text-lg font-bold">계좌 상세</h1>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-6">
          <div className="text-center py-16 bg-white rounded-xl border border-red-200">
            <svg className="w-12 h-12 text-red-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-red-500 font-medium mb-1">{loadError}</p>
            <p className="text-gray-400 text-sm mb-4">json-server가 실행 중인지 확인해주세요.</p>
            <button
              onClick={() => navigate('/accounts')}
              className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors ring-1 ring-gray-200"
            >
              목록으로 돌아가기
            </button>
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/accounts')}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">계좌 상세</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-6">
        {/* 에러 배너 */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg ring-1 ring-red-200">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {isEditing ? (
          /* ===== 수정 모드 ===== */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <h2 className="font-bold text-blue-900">계좌 정보 수정</h2>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  계좌명
                </label>
                <input
                  value={form.accountName}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, accountName: e.target.value }))
                  }
                  className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  잔액
                </label>
                <input
                  type="number"
                  value={form.balance}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      balance: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm"
                >
                  저장
                </button>
                <button
                  onClick={() => { setIsEditing(false); setError(''); }}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ===== 조회 모드 ===== */
          <>
            {/* 잔액 카드 */}
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
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    account.isActive
                      ? 'bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30'
                      : 'bg-white/10 text-blue-200 ring-1 ring-white/20'
                  }`}
                >
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

            {/* 계좌 정보 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
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

            {/* 액션 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => { setIsEditing(true); setError(''); }}
                className="flex-1 bg-blue-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-100 transition-colors ring-1 ring-red-200"
              >
                삭제
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
