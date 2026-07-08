import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
};

type Wallet = {
  id: string;
  balance: number;
  user: {
    full_name: string;
  };
  transactions: Transaction[];
};

type Alert={
   id: string;
  message: string;
  type:string
  isRead: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showAlerts, setShowAlerts] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch("http://localhost:4900/api/v1/wallets/", {
          credentials: "include",
        });
        console.log("response status:", response.status);
        if (response.status === 401) {
          toast.error("Session expired, please log in again");
          navigate("/login");
          return;
        }

        const result = await response.json();
        setWallet(result.data);
      } catch (error) {
        console.error("Failed to fetch wallet:", error);
        toast.error("Could not load wallet");
      } finally {
        setLoading(false);
      }
    };

 const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:4900/api/v1/alerts/", {
          credentials: "include",
        });
        const result = await response.json();
        setAlerts(result.data.alerts);
        setUnreadCount(result.data.alerts.filter((a: Alert) => !a.isRead).length);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };


    fetchWallet();
    fetchAlerts();
  }, [navigate]);

 const handleBellClick = async () => {
  setShowAlerts((prev) => !prev);

  if (!showAlerts && unreadCount > 0) {
    try {
      const unreadAlerts = alerts.filter((alert) => !alert.isRead);

      await Promise.all(
        unreadAlerts.map((alert) =>
          fetch(`http://localhost:4900/api/v1/alerts/${alert.id}`, {
            method: "PATCH",
            credentials: "include",
          })
        )
      );

      setUnreadCount(0);
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) => ({ ...alert, isRead: true }))
      );

    } catch (error) {
      console.error("Failed to mark alerts as read:", error);
    }
  }
};




  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-300 border border-gray-100 rounded-2xl p-6 relative">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-extrabold text-3xl text-gray-900">Lite Wallet</h1>

           {/* BELL */}
          <div className="relative">
            <button
              onClick={handleBellClick}
              className="flex items-center gap-2 text-2xl font-bold hover:text-gray-700 transition relative"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
{/* ALERTS DROPDOWN */}
            {showAlerts && (
              <div className="fixed inset-x-4 top-20 z-10 lg:absolute lg:inset-auto lg:right-0 lg:top-10 lg:w-72 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">Alerts</p>
                  

                </div>
                {alerts.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No alerts
                  </p>
                ) : (
                  <ul className="max-h-64 overflow-y-auto">
                    {alerts.slice(0, 10).map((alert) => (
                      <li
                        key={alert.id}
                        className={`px-4 py-3 border-b border-gray-50 last:border-0 ${
                          !alert.isRead ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <p className="text-sm text-gray-700">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:grid lg:grid-cols-[200px_1px_1fr] gap-6 lg:gap-8">
          {/* LEFT PANEL */}
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">Welcome</p>
                <p className="text-2xl font-mono text-gray-900">
                  {wallet?.user.full_name ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">Balance</p>
                <p className="text-3xl font-mono text-gray-900">
                  UGX {wallet?.balance.toLocaleString() ?? "0"}
                </p>
              </div>
            </div>

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
              <button
                onClick={() => navigate("/deposit")}
                className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition"
              >
                + Deposit
              </button>
              <button  onClick={() => navigate("/transfer")}
              className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition">
                ↗ Transfer
              </button>
              <button
                onClick={() => navigate("/withdraw")}
                className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 flex items-center justify-center gap-2 text-2xl font-mono text-gray-700 hover:bg-gray-100 transition"
              >
                $ Withdraw
              </button>
            </div>

            {/* RECENT TRANSACTIONS */}
            <div className="border border-[#000000] rounded-xl overflow-hidden">
              <div className="flex items-center border-b border-[#000000]">
                <div className="px-5 py-4 text-base font-bold text-gray-900 border-r border-[#000000]">
                  UGX {wallet?.balance.toLocaleString() ?? "0"}
                </div>
                <div className="flex-1 px-5 py-4 text-sm text-gray-400">
                  Recent transactions
                </div>
                <div className="px-4 py-4 text-gray-300">›</div>
              </div>

              {/* TRANSACTION LIST */}
              {wallet?.transactions.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  No transactions yet
                </p>
              ) : (
                <ul>
                  {wallet?.transactions.slice(0, 5).map((tx) => (
                    <li
                      key={tx.id}
                      className="flex items-center justify-between px-5 py-3 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800 capitalize">
                          {tx.type}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={
                          tx.type.toLowerCase() === "deposit"
                            ? "text-sm font-semibold text-green-600"
                            : tx.type.toLowerCase() === "withdraw"
                              ? "text-sm font-semibold text-red-500"
                              : "text-sm font-semibold text-orange-500"
                        }
                      >
                        {tx.type.toLowerCase() === "deposit"
                          ? "↓"
                          : tx.type.toLowerCase() === "withdraw"
                            ? "↑"
                            : "⇄"}{" "}
                        UGX {tx.amount.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

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
