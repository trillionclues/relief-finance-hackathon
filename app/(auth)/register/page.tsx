"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/context/AuthContext";

const CreateAccount = () => {
  const { loginWithGoogle } = useContext(AuthContext);

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero-image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10 max-w-md w-full bg-white rounded-lg p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <Link href="/" className="cursor-pointer">
            <div className="w-24">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Logo"
                className="w-full h-auto"
              />
            </div>
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        <button
          type="button"
          className="flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="mr-2" size={24} />
          Sign up with Google
        </button>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
