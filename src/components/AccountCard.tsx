import { Account } from '../types/Account';

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <svg className="w-5 h-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
              {account.accountName}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 tracking-wider">
              {account.accountNumber}
            </p>
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            account.isActive
              ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
              : 'bg-gray-50 text-gray-400 ring-1 ring-gray-200'
          }`}
        >
          {account.isActive ? '활성' : '비활성'}
        </span>
      </div>
      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">잔액</span>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          {account.balance.toLocaleString()}
          <span className="text-sm font-medium text-gray-500 ml-0.5">원</span>
        </span>
      </div>
    </div>
  );
}
