import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white border border-gray-100 rounded-2xl p-8 grid grid-cols-[220px_1px_1fr] gap-8 relative">

        {/* TOP RIGHT */}
        <div className="absolute top-8 right-8">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition">
            🔔 Alerts
          </button>
        </div>

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between">
          <div className="space-y-8">
            <h1 className="text-lg font-medium text-gray-900">Lite Wallet</h1>
            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-400 mb-1">Welcome</p>
                <p className="text-base font-medium text-gray-900">Lucia Nambi</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Balance</p>
                <p className="text-2xl font-medium text-gray-900">UGX 0</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition mt-8"
          >
            ← Log out
          </button>
        </div>

        {/* DIVIDER */}
        <div className="bg-gray-100 w-px" />

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
              + Deposit
            </button>
            <button className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
              ↗ Transfer
            </button>
            <button className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
              $ Withdraw
            </button>
          </div>

          <div className="flex items-center border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-5 py-4 text-base font-medium text-gray-900 border-r border-gray-100">
              UGX 0
            </div>
            <div className="flex-1 px-5 py-4 text-sm text-gray-400">
              Recent transactions
            </div>
            <div className="px-4 py-4 text-gray-300">›</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;