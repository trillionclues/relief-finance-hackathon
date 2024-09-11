"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";

const DashboardNav = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <div className="w-20 sm:w-24">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width={200}
                  height={200}
                  alt="Logo"
                  className="w-full h-auto"
                />
              </Link>
            </div>
            <div className="hidden md:block ml-10 md:mt-1">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-xs"
                >
                  Home
                </Link>
                <Link
                  href="/campaigns"
                  className="text-gray-600 hover:text-gray-900 text-xs"
                >
                  Campaigns
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 text-xs"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <div className="ml-3 relative">
              <div>
                {currentUser?.photoURL ? (
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Image
                      src={currentUser.photoURL}
                      width={50}
                      height={50}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full"
                    />
                  </button>
                ) : (
                  <button
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => router.push("/login")}
                  >
                    <FaUserCircle size={32} className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
