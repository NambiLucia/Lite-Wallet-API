import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-300 border border-gray-100 rounded-2xl p-6 relative">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-extrabold text-3xl text-gray-900">Lite Wallet</h1>
          <button className="flex items-center gap-2 text-2xl font-bold hover:text-gray-700 transition">
            🔔 Alerts
          </button>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:grid lg:grid-cols-[200px_1px_1fr] gap-6 lg:gap-8">

          {/* LEFT PANEL */}
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">Welcome</p>
                <p className="text-2xl font-mono text-gray-900">Lucia Nambi</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">Balance</p>
                <p className="text-3xl font-mono text-gray-900">UGX 0</p>
              </div>
            </div>

            {/* Logout — visible on desktop only in left panel */}
            <button
              onClick={() => navigate("/login")}
              className="hidden lg:flex items-center gap-2 text-sm text-gray-800 hover:text-gray-400 transition mt-4"
            >
              ← Log out
            </button>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block bg-[#000000] w-px" />
          <div className="block lg:hidden h-px bg-gray-100 w-full" />

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition">
                + Deposit
              </button>
              <button className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition">
                ↗ Transfer
              </button>
              <button className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition">
                $ Withdraw
              </button>
            </div>

            <div className="flex items-center border border-[#000000] rounded-xl overflow-hidden">
              <div className="px-5 py-4 text-base font-bold text-gray-900 border-r border-[#000000]">
                UGX 0
              </div>
              <div className="flex-1 px-5 py-4 text-sm text-gray-400">
                Recent transactions
              </div>
              <div className="px-4 py-4 text-gray-300">›</div>
            </div>
          </div>

        </div>

        {/* Logout — mobile only, sits below everything */}
        <button
          onClick={() => navigate("/login")}
          className="lg:hidden w-full mt-6 py-3 border border-gray-400 rounded-xl text-sm text-gray-800 hover:bg-gray-400 transition"
        >
          ← Log out
        </button>

      </div>
    </div>
  );
};

export default Dashboard;