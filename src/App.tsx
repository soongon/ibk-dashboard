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

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900">IBK 급여통장</h3>
              <p className="text-xs text-gray-400 mt-0.5 tracking-wider">049-12-345678</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
              활성
            </span>
          </div>
          <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">잔액</span>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              2,500,000<span className="text-sm font-medium text-gray-500 ml-0.5">원</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
