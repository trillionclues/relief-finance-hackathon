"use client";
import { ABI } from "@/abi/relief-finance";
import DashboardNav from "@/components/home/DashboardNav";
import ProposalItem from "@/components/listItems/ProposalItem";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import { categories } from "@/public/data/categories";
import { GetAllCampaigns } from "@/types/GetAllCampaignProposals";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

const ProposalsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [campaigns, setCampaigns] = useState<GetAllCampaigns[]>([]);
  const itemsPerPage = 6;

  // Fetch all created campaigns
  const {
    data: proposalList,
    refetch,
    isLoading,
    isError,
  } = useReadContract({
    abi: ABI,
    functionName: "getAllCampaigns",
    address: RWA_ADDRESS,
    chainId: 42421,
  });

  useEffect(() => {
    if (proposalList && Array.isArray(proposalList)) {
      const campaignsConverted = proposalList.map((campaign: any) => ({
        amountRaised: Number(campaign.amountRaised),
        category: campaign.category,
        createdAt: new Date(Number(campaign?.createdAt) * 1000),
        creator: campaign.creator,
        deadline: new Date(Number(campaign?.deadline) * 1000),
        description: campaign.description,
        goal: Number(campaign.goal),
        id: Number(campaign.id),
        isCompleted: campaign.isCompleted,
        physicalAddress: campaign.physicalAddress,
        title: campaign.title,
      }));

      setCampaigns(campaignsConverted.reverse());
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
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="text-center mb-8">
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
          </nav>
          <div>
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-2 text-sm ${
                currentPage === totalPages ? "text-gray-400" : "text-teal-500"
              }`}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalsList;
