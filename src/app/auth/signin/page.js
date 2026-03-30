"use client"

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
   const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password,  } = formData;

    try {
      const { data, error } = await signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            toast.loading("Signing In....", { id: "sign-in" });
            setLoading(false);
          },
          onSuccess: () => {
            toast.success("Account created successfully!", { id: "sign-in" });
            setLoading(false);
          },
          onError: (ctx) => {
          
            toast.error(ctx.error.message, {
              id: "sign-in",
            });
            setLoading(false);
          },
        },
      );
      setLoading(false);
      console.log({ data, error });
    } catch (e) {
      toast.error("An unexpected error occurred. Please try again.", {
        id: "sign-in",
      });
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center">
          <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <span className="text-4xl">👋</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Sign In</h1>
          <p className="text-blue-100 mt-2">Welcome back!</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center disabled:opacity-70 mt-8"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>)
};

export default SignInPage;