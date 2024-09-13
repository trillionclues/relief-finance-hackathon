"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { categories } from "@/public/data/categories";
import ProposalItem from "../listItems/ProposalItem";
import { useReadContract } from "wagmi";
import { ABI } from "@/abi/relief-finance";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import { GetAllCampaigns } from "@/types/GetAllCampaignProposals";

const OpenProposalsList = () => {
  const [campaigns, setCampaigns] = useState<GetAllCampaigns[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch all created campaigns
  const {
    data: proposalList,
    isLoading,
    isError,
  } = useReadContract({
    abi: ABI,
    functionName: "getAllCampaignsWithContibutorCount",
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  useEffect(() => {
    if (proposalList && Array.isArray(proposalList)) {
      const flatCampaignData = proposalList.flat();

      const campaignsConverted = flatCampaignData.map(
        (item): GetAllCampaigns | null => {
          if (item && typeof item === "object") {
            return {
              amountRaised: Number(item?.amountRaised),
              category: item?.category,
              createdAt: new Date(Number(item?.createdAt) * 1000),
              creator: item?.creator,
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
  }, [proposalList]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesQuery = campaign.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      campaign.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  // Pagination
  const totalItems = filteredCampaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampaigns.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-10" id="open-proposals">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Open <span className="text-teal-500">Proposals</span>
          </h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Find proposals..."
              className="w-full max-w-md p-2 border border-gray-300 rounded-full text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-2 text-xs py-1 rounded-full border ${
                selectedCategory === category
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500 border-teal-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : currentItems.length === 0 ? (
          <p className="text-center text-gray-500">
            No proposals available for the selected category.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {currentItems.map((proposal) => {
              const progress = (proposal?.amountRaised / proposal?.goal) * 100;
              return (
                <ProposalItem
                  key={proposal?.id}
                  proposal={proposal}
                  progress={progress}
                />
              );
            })}
          </div>
        )}

        <div className="flex justify-between items-center mt-5 md:mx-32 ">
          <nav className="inline-flex space-x-1">
            <button
              onClick={() => handlePageChange(1)}
              className={`px-2 py-1 text-sm ${
                currentPage === 1 ? "text-gray-400" : "text-teal-500"
              }`}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 rounded-md ${
                  currentPage === i + 1
                    ? "bg-teal-500 text-white"
                    : "text-teal-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-2 text-sm ${
                currentPage === totalPages ? "text-gray-400" : "text-teal-500"
              }`}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </nav>
          <div>
            <Link
              href={"/campaigns"}
              className="text-teal-500 text-sm flex flex-row items-center gap-2"
            >
              See all <FaArrowRightLong size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenProposalsList;
