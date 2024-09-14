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
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import DashboardCampaignItem from "@/components/dashboard/DashboardCampaignItem";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<GetAllCampaigns[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isConnected, address } = useAccount();

  // Fetch campaigns by creator
  const {
    data: getcampaigns,
    refetch,
    isLoading,
    isRefetching,
  } = useReadContract({
    abi: ABI,
    functionName: "getCampaignsByCreatorWithApprovalStatus",
    args: [address],
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  // create campaign
  const {
    writeContract: createCampaign,
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
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Error creating campaign!");
    } finally {
      if (isCreating) {
        toast.info("Transaction submitted, waiting for confirmation...");
      } else if (isError) {
        toast.error(`${error?.message}`);
      }
    }
  };

  // Refetch campaigns
  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
      }, 100);
      toast.success("Campaign created successfully!");
      refetch();
      window.location.reload();
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, refetch]);

  // Convert BigInt to number
  useEffect(() => {
    if (getcampaigns && Array.isArray(getcampaigns)) {
      const flatCampaignData = getcampaigns.flat();

      const campaignsConverted = flatCampaignData.map(
        (item): GetAllCampaigns | null => {
          if (item && typeof item === "object") {
            return {
              amountRaised: Number(item?.amountRaised),
              category: item.category,
              createdAt: new Date(Number(item?.createdAt) * 1000),
              creator: item.creator,
              deadline: new Date(Number(item?.deadline) * 1000),
              description: item?.description,
              goal: Number(item?.goal) / 10 ** 9,
              id: Number(item?.id),
              isApproved: item?.isApproved ?? false,
              isCompleted: item?.isCompleted ?? false,
              physicalAddress: item?.physicalAddress,
              title: item?.title,
            };
          }
          return null;
        }
      );

      const filteredCampaigns = campaignsConverted.filter(
        (campaign): campaign is GetAllCampaigns => campaign !== null
      );

      if (JSON.stringify(filteredCampaigns) !== JSON.stringify(campaigns)) {
        setCampaigns(filteredCampaigns);
      }
    }
  }, [getcampaigns, campaigns]);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNav />

      <div className="flex-1 p-6 flex flex-col lg:flex-row pt-16">
        <div className="flex-1 lg:w-9/12">
          <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-teal-800">
                My Campaigns
              </h1>
              <hr className="border-t-4 border-teal-500 w-full" />
            </div>
            {isConnected && currentUser ? (
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-600 text-sm"
                onClick={() => setIsModalOpen(true)}
              >
                {isCreating ? "Creating..." : "Create Campaign"}
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
                  <DashboardCampaignItem
                    progress={progress}
                    key={campaign.id}
                    campaign={campaign}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <MdCampaign className="text-gray-400 text-6xl" />

              <p className="text-gray-500 text-sm text-center">
                No campaigns created yet!
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
