"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { activityTimeline, allowedAdminEmails } from "@/public/data/data";
import DashboardNav from "@/components/home/DashboardNav";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CreateProposalFormData } from "@/types/CreateProposalForm";
import CreateProposalModal from "@/components/modal/CreateProposalModal";
import { ABI } from "@/abi/relief-finance";
import { GetAllCampaigns } from "@/types/GetAllCampaignProposals";
import { MdCampaign } from "react-icons/md";
import { toast } from "react-toastify";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<GetAllCampaigns[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isConnected, address } = useAccount();

  // create campaign
  const {
    writeContract: createCampaign,
    data,
    isError,
    error,
    isPending: isCreating,
    isSuccess,
  } = useWriteContract();

  const handleCreateProposal = async (
    createProposalData: CreateProposalFormData
  ) => {
    try {
      const result = await createCampaign({
        chainId: 42421,
        abi: ABI,
        address: RWA_ADDRESS,
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

      if (isCreating) {
        toast.info("Transaction submitted, waiting for confirmation...");
      } else if (isError) {
        toast.error(`${error?.message}`);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Campaign creation failed");
    }
  };

  if (isSuccess) {
    setIsModalOpen(false);
    toast.success("Transaction successful!");
  }

  // Approve campaign
  const { writeContract: approveCampaign, isPending: isApproving } =
    useWriteContract();
  const handleApproveCampaign = (campaignId: number) => {
    approveCampaign({
      chainId: 42421,
      abi: ABI,
      address: RWA_ADDRESS,
      functionName: "approveCampaign",
      args: [campaignId],
    });
    if (isApproving) {
      toast.success("Campaign approval in progress...");
    } else {
      toast.error("Campaign approval failed");
    }
  };

  // Fetch campaigns by creator
  const {
    data: campaign,
    refetch,
    isLoading,
    isRefetching,
  } = useReadContract({
    abi: ABI,
    functionName: "getCampaignsByCreator",
    args: [address],
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  // Convert BigInt to number
  useEffect(() => {
    if (campaign && Array.isArray(campaign)) {
      const campaignsConverted = campaign.map((campaign: any) => ({
        amountRaised: Number(campaign?.amountRaised),
        category: campaign?.category,
        createdAt: new Date(Number(campaign?.createdAt) * 1000),
        creator: campaign.creator,
        deadline: new Date(Number(campaign?.deadline) * 1000),
        description: campaign?.description,
        goal: Number(campaign?.goal),
        id: Number(campaign?.id),
        isApproved: campaign?.isApproved,
        isCompleted: campaign?.isCompleted,
        physicalAddress: campaign?.physicalAddress,
        title: campaign?.title,
      }));

      setCampaigns(campaignsConverted);
    }
  }, [campaign]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8">
              {campaigns.map((campaign) => {
                const progress =
                  (campaign?.amountRaised / campaign?.goal) * 100;
                return (
                  <div
                    key={campaign.id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {campaign.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Owner:{" "}
                          <span className="font-medium text-gray-700">
                            {currentUser?.displayName || "Anonymous"}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {campaign.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Goal Amount</p>
                      <p className="text-2xl font-semibold text-teal-600">
                        {campaign.goal} USDT
                      </p>
                      <div className="relative mt-3 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-right text-sm text-gray-600">
                        {Math.round(progress)}% funded
                      </p>
                    </div>

                    {isConnected &&
                      currentUser?.email &&
                      allowedAdminEmails.includes(currentUser.email) && (
                        <button
                          className="bg-green-700 text-white px-5 py-2 mt-3 rounded-full shadow-md hover:bg-green-800 transition-colors duration-300 w-full"
                          onClick={() => handleApproveCampaign(campaign.id)}
                          disabled={isApproving}
                        >
                          {isApproving ? "Approving..." : "Approve Campaign"}
                        </button>
                      )}
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
