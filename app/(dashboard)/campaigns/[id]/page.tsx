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
    functionName: "getCampaign",
    args: [Number(id)],
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  useEffect(() => {
    if (campaign && Array.isArray(campaign)) {
      const mappedCampaign: GetSingleCampaignDetails = {
        id: Number(campaign[0]),
        creator: campaign[1],
        title: campaign[2],
        description: campaign[3],
        physicalAddress: campaign[4],
        goal: Number(campaign[5]),
        deadline: new Date(Number(campaign[6]) * 1000),
        amountRaised: Number(campaign[7]),
        isCompleted: campaign[8],
        createdAt: new Date(Number(campaign[9]) * 1000),
        category: campaign[10] as string,
      };

      setCampaignDetails(mappedCampaign);
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
            <h1 className="text-4xl font-bold mb-4">
              {campaignDetails?.title}
            </h1>
            <p className="text-gray-700 mb-4">{campaignDetails?.description}</p>
            <Link href="#" className="text-teal-500">
              Read more
            </Link>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <p className="text-xl font-semibold text-teal-500">
                  ${campaignDetails?.amountRaised?.toLocaleString()} / $
                  {campaignDetails?.goal?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">452 donations</p>
              </div>
              <div className="bg-gray-200 h-2 rounded-full mt-2">
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
                <div>
                  <h3 className="text-md font-semibold">{"John Doe"}</h3>
                  <p className="text-xs text-gray-500">Organizer</p>
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
