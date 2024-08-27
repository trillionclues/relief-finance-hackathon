"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { activityTimeline, proposals } from "@/public/data/data";
import DashboardNav from "@/components/home/DashboardNav";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ProposalModal from "@/components/modal/ProposalModal";

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isConnected } = useAccount();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleCreateProposal = (proposalData: any) => {
    console.log("New Proposal Data:", proposalData);
    // Add your logic to handle the new proposal creation
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNav />

      <div className="flex-1 p-6 flex flex-col lg:flex-row pt-16">
        <div className="flex-1 lg:w-9/12">
          <div className="flex flex-row justify-between items-center mb-4">
            <h1 className="text-lg font-semibold mb-4">My Campaigns</h1>
            {isConnected && currentUser ? (
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600 text-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Create Proposal
              </button>
            ) : (
              <ConnectButton label="Connect Wallet" />
            )}
          </div>
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
          <h2 className="text-md font-semibold mb-4">Activity</h2>
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

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
      />
    </div>
  );
};

export default Dashboard;
