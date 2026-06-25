import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const depositSchema = z.object({
  amount: z.number({
    error: (issue) =>
      issue.input === undefined
        ? "Amount is required"
        : "Amount must be a number",
  }),
});

type DepositFormData = z.infer<typeof depositSchema>;

const Deposit = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  const onSubmit = async (data: DepositFormData) => {
    try {
      const response = await fetch("http://localhost:4900/api/v1/wallets/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: data.amount }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Deposit failed");
        return;
      }

      toast.success("Deposit successful");
      navigate("/dashboard");

    } catch (error) {
      console.error("Network error:", error);
      toast.error("Could not connect to server. Is your API running?");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-300 border border-gray-100 rounded-2xl p-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            ← Back
          </button>
          <h1 className="font-extrabold text-2xl text-gray-900">Deposit</h1>
          <div className="w-10" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* AMOUNT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (UGX)
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full border border-gray-400 bg-gray-50 rounded-xl px-4 py-3 text-2xl font-mono text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Confirm Deposit"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 border border-gray-400 rounded-xl text-sm text-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
};

export default Deposit;