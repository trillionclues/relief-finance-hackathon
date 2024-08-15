import React from "react";
import Image from "next/image";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero-image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10 max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-24">
            <Image
              src="/images/logo.png"
              width={100}
              height={100}
              alt="Logo"
              className="w-full h-auto"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Get Started
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 leading-tight"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <Link href="/auth/reset" className="text-sm text-teal-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-teal-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
