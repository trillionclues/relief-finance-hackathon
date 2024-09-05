"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { activityTimeline } from "@/public/data/data";
import DashboardNav from "@/components/home/DashboardNav";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CreateProposalFormData } from "@/types/CreateProposalForm";
import CreateProposalModal from "@/components/modal/CreateProposalModal";
import { ABI } from "@/abi/relief-finance";
import { GetAllCampaigns } from "@/types/GetAllCampaignProposals";
import { MdCampaign } from "react-icons/md";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<GetAllCampaigns[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isConnected, address } = useAccount();
  const CONTRACT_ADDRESS = `0xa6e24ea4794bbe2dec65036d480bd4821a861df4`;

  // Fetch campaigns by creator
  const {
    data: proposalList,
    refetch: fetchProposals,
    isLoading,
    isError: isReadError,
    isRefetching,
  } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCampaignsByCreator",
    args: [address],
  });

  // Convert BigInt to number
  useEffect(() => {
    if (proposalList && Array.isArray(proposalList)) {
      const campaignsConverted = proposalList.map((campaign: any) => ({
        amountRaised: Number(campaign.amountRaised),
        category: campaign.category,
        createdAt: Number(campaign.createdAt),
        creator: campaign.creator,
        deadline: Number(campaign.deadline),
        description: campaign.description,
        goal: Number(campaign.goal),
        id: Number(campaign.id),
        isApproved: campaign.isApproved,
        isCompleted: campaign.isCompleted,
        physicalAddress: campaign.physicalAddress,
        title: campaign.title,
      }));

      setCampaigns(campaignsConverted);
    }
  }, [proposalList]);

  const {
    writeContract: createCampaign,
    data,
    isError,
    isPending: isCreating,
    isSuccess,
  } = useWriteContract();

  const handleCreateProposal = (createProposalData: CreateProposalFormData) => {
    createCampaign({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "createCampaign",
      args: [
        createProposalData.title,
        createProposalData.description,
        createProposalData.physicalAddress,
        createProposalData.goal,
        createProposalData.duration,
        createProposalData.category,
      ],
    });
    fetchProposals();
    setIsModalOpen(false);
    if (isSuccess) {
      toast.success("Proposal created successfully");
    } else {
      toast.error("Proposal creation failed");
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
                Create Campaign
              </button>
            ) : (
              <ConnectButton label="Connect Wallet" />
            )}
          </div>

          {isLoading || isRefetching ? (
            <div className="mt-10 flex justify-center items-center">
              <div className="loader border-t-4 border-teal-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
          ) : campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {campaigns.map((campaign) => {
                const progress =
                  (campaign?.amountRaised / campaign?.goal) * 100;
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
                        <p className="text-sm text-gray-600">
                          Owner: {currentUser?.displayName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {campaign.physicalAddress}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-400">Goal Amount</p>
                      <p className="text-xl font-semibold">
                        {campaign.goal} USDT
                      </p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <MdCampaign className="text-gray-400 text-6xl" />

              <p className="text-gray-500 text-sm text-center">
                No campaigns created yet.
              </p>

              {isConnected && currentUser && (
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600 text-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create Campaign
                </button>
              )}
            </div>
          )}
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

      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
        isCreating={isCreating}
      />
    </div>
  );
};

export default Dashboard;
