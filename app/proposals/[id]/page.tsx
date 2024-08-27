"use client";
import React, { useContext } from "react";
import { proposals } from "@/public/data/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import FundCampaign from "@/components/proposals/FundCampaign";
import DashboardNav from "@/components/home/DashboardNav";
import ProposalFundingHistory from "@/components/proposals/ProposalFundingHistory";

const ProposalDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const proposal = proposals.find((p) => p.id === Number(id));
  if (!proposal) {
    return <p>Proposal not found</p>;
  }

  return (
    <>
      <DashboardNav />
      <section className="pt-16 py-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Image
              src={proposal.image || "/default-image.jpg"}
              alt={proposal.title}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-3"> {proposal?.paraText}</p>
            <FundCampaign />
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">{proposal.title}</h1>
            <p className="text-gray-700 mb-4">{proposal.description}</p>
            <Link href="#" className="text-teal-500">
              Read more
            </Link>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <p className="text-xl font-semibold text-teal-500">
                  ${proposal.currentAmount.toLocaleString()} / $
                  {proposal.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {proposal?.donationsCount} donations
                </p>
              </div>
              <div className="bg-gray-200 h-2 rounded-full mt-2">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{
                    width: `${
                      (proposal.currentAmount / proposal.totalAmount) * 100
                    }%`,
                  }}
                />
              </div>
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
            <ProposalFundingHistory proposal={proposal} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProposalDetails;
