"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import DashboardNav from "@/components/home/DashboardNav";
import { useReadContract } from "wagmi";
import { ABI } from "@/abi/relief-finance";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import { GetSingleCampaignDetails } from "@/types/GetSingleCampaignDetails";
import FundCampaign from "@/components/campaigns/FundCampaign";

const ProposalDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [campaignDetails, setCampaignDetails] =
    useState<GetSingleCampaignDetails | null>(null);

  // Fetch campaign details
  const {
    data: campaign,
    refetch,
    isLoading,
    isError,
  } = useReadContract({
    abi: ABI,
    functionName: "getCampaignWithContributors",
    args: [Number(id)],
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  // get campaign approval status
  const { data, isLoading: checkingStatus } = useReadContract({
    abi: ABI,
    functionName: "isApproved",
    args: [Number(id)],
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  useEffect(() => {
    if (campaign && Array.isArray(campaign)) {
      const flatCampaignDetails = campaign.flat();

      const campaignsDetailsConverted = flatCampaignDetails.map(
        (item): GetSingleCampaignDetails | null => {
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
              isCompleted: item?.isCompleted ?? false,
              physicalAddress: item?.physicalAddress,
              title: item?.title,
              // contributors: item?.contributors?.map((contributor) => ({
              //   address: contributor.address,
              //   amount: Number(contributor.amount),
              // })),
              // contributors: item?.contributors,
            };
          }
          return null;
        }
      );

      const filteredCampaigns = campaignsDetailsConverted.filter(
        (campaign): campaign is GetSingleCampaignDetails => campaign !== null
      );

      if (
        filteredCampaigns.length > 0 &&
        JSON.stringify(filteredCampaigns[0]) !== JSON.stringify(campaignDetails)
      ) {
        setCampaignDetails(filteredCampaigns[0]);
      }
    }
  }, [campaign]);

  if (!campaignDetails && !isLoading) {
    return <p>No campaigns found!</p>;
  }

  return (
    <>
      <DashboardNav />
      <section className="pt-16 py-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Image
              src="/images/drought.png"
              alt={campaignDetails?.title || "Campaign Image"}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-3">
              {campaignDetails?.description}
            </p>
            {campaignDetails && (
              <FundCampaign campaignDetails={campaignDetails} />
            )}
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <h1 className="text-4xl font-bold">{campaignDetails?.title}</h1>
              {checkingStatus ? (
                <span className="ml-4 px-4 py-[6px] text-xs  text-white bg-teal-500 rounded-md">
                  Loading...
                </span>
              ) : data === false ? (
                <span className="ml-4 px-4 py-1 text-xs text-white bg-red-500 rounded-md">
                  Not Approved
                </span>
              ) : (
                <span className="ml-4 px-4 py-1 text-xs text-white bg-teal-500 rounded-md">
                  Approved
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{campaignDetails?.description}</p>
            <Link href="#" className="text-teal-500">
              Read more
            </Link>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold text-teal-500">
                  {campaignDetails?.amountRaised.toLocaleString()} RWA
                </div>
                <div className="text-lg font-semibold text-teal-500">
                  {campaignDetails?.goal.toLocaleString()} RWA
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-200 h-2 rounded-full">
                  <div
                    className="h-full bg-teal-500 rounded-full"
                    style={{
                      width: `${
                        ((campaignDetails?.amountRaised ?? 0) /
                          (campaignDetails?.goal ?? 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-teal-600">
                  {Math.round(
                    ((campaignDetails?.amountRaised ?? 0) /
                      (campaignDetails?.goal ?? 1)) *
                      100
                  )}
                  %
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">
                <strong>Deadline:</strong>{" "}
                {campaignDetails?.deadline?.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                {campaignDetails?.isCompleted ? "Completed" : "Ongoing"}
              </p>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-sm hover:bg-teal-600">
                Share Campaign
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-300">
                Like
              </button>
            </div>

            <div className="mt-8">
              <div className="flex space-x-4">
                {currentUser?.photoURL ? (
                  <Image
                    src={currentUser.photoURL}
                    width={50}
                    height={50}
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <FaUserCircle size={48} className="text-gray-500" />
                )}
                <div className="mt-1 max-w-xs overflow-hidden text-ellipsis">
                  <h3 className="text-xs">{campaignDetails?.creator}</h3>
                  <p className="text-sm font-semibold text-gray-500">
                    Organizer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProposalDetails;
