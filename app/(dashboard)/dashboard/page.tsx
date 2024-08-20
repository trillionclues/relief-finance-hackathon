"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { activityTimeline, proposals } from "@/public/data/data";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <div className="w-20 sm:w-24">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    width={140}
                    height={130}
                    alt="Logo"
                    className="w-full h-auto"
                  />
                </Link>
              </div>
              <div className="hidden md:block ml-10 md:mt-1">
                <div className="flex items-baseline space-x-4">
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-xs"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-xs"
                  >
                    Campaigns
                  </Link>
                  <Link
                    href="#"
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
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Image
                      src={currentUser?.photoURL || "/avatar.jpg"}
                      width={50}
                      height={50}
                      alt="Logo"
                      className="h-8 w-8 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 p-6 flex flex-col lg:flex-row">
        {/* Campaign Cards */}
        <div className="flex-1 lg:w-9/12">
          <h1 className="text-xl font-semibold mb-4">My Campaigns</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposals.map((campaign) => {
              const progress =
                (campaign?.currentAmount / campaign?.totalAmount) * 100;
              return (
                <div
                  key={campaign.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {campaign.title}
                      </h2>
                      <p className="text-sm text-gray-600">{campaign.owner}</p>
                      <p className="text-xs text-gray-400">
                        {campaign.address}
                      </p>
                    </div>
                    <div>
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        width={80}
                        height={50}
                        className="rounded-md w-auto h-auto"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-gray-400">Total donations</p>
                    <p className="text-xl font-semibold">
                      {campaign.totalAmount}
                    </p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: progress }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:w-3/12 lg:pl-4">
          <h2 className="text-lg font-semibold mb-4">Activity</h2>
          <ul className="space-y-4">
            {activityTimeline.map((activity) => (
              <li key={activity.id} className="flex items-center space-x-3">
                <Image
                  src={currentUser?.photoURL || "/avatar.jpg"}
                  alt={activity.user}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm">{activity.user}</p>
                  <p className="text-xs text-gray-400">{activity.action}</p>
                  <p className="text-xs text-green-600">{activity.amount}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
