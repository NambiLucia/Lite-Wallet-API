// import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

const loginSchema =z.object({
  email: z
     .email({
      message: "Enter a valid email address",
    })
    .min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignUpFormData=z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch(
        "http://localhost:4900/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
           
          },
          credentials:"include",
          body: JSON.stringify(data),             
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Registration failed:", result);
        alert(result.message || "Something went wrong");
        return;
      }

      console.log("Login successfully:", result);
      navigate('/dashboard')
      

    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to server. Is your API running?");
    }
  };

  return (
    <div>
      <section className="flex min-h-screen bg-gray-50">

        
        <div
          className="hidden lg:flex w-1/2 text-white items-center justify-center p-12 bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        >
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-4xl font-bold">Lite Wallet</h1>
            <p className="text-lg text-gray-200">
              Set up in seconds. Send, receive, and manage money — effortlessly.
            </p>
          </div>
        </div>

       
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-gray-100">
          <div className="w-full max-w-md space-y-6">

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Login to Lite Wallet</h2>
              <p className="text-gray-500 mt-1">Join Lite Wallet today</p>
            </div>

          
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="mary@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email")}
                />
                
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-950 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging In..." : "Login"}
              </button>

            </form>

            <p className="text-center text-sm text-gray-500">
              Have No Account?{" "}
              <Link to="/" className="text-blue-600 font-medium hover:underline">
                Sign up Here!
              </Link>
            </p>

          </div>
        </div>

      </section>
    </div>
  );
};

export default Login;