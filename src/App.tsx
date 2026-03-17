import AccountCard from './components/AccountCard';
import { Account } from './types/Account';

const sampleAccount: Account = {
  id: '1',
  accountName: 'IBK 급여통장',
  accountNumber: '049-12-345678',
  balance: 2500000,
  isActive: true,
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-lg font-bold">IBK 계좌 관리</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">계좌 목록</h2>
        <AccountCard account={sampleAccount} />
      </main>
    </div>
  );
}
