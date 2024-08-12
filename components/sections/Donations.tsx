"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiBookmark } from "react-icons/fi";
import { donations } from "@/public/data/data";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { categories } from "@/public/data/categories";

const OpenDonationsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredDonations = donations.filter((donation) => {
    const matchesQuery = donation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || donation.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  // Pagination
  const totalItems = filteredDonations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDonations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Open <span className="text-teal-500">donations</span>
          </h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Find donations..."
              className="w-full max-w-md p-2 border border-gray-300 rounded-full text-sm"
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

        {currentItems.length === 0 ? (
          <p className="text-center text-gray-500">
            No donations available for the selected category.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {currentItems.map((donation) => {
              const progress =
                (donation.currentAmount / donation.totalAmount) * 100;
              return (
                <div
                  key={donation.id}
                  className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-200 rounded-md shadow-sm overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={donation.image}
                      alt={donation.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-center text-gray-500 text-xs mb-2">
                        <span>{donation.date}</span>
                        <span>{donation.donationsCount} donations</span>
                      </div>
                      <h3 className="text-md font-bold text-gray-800 mb-2">
                        {donation.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4 h-16 overflow-hidden">
                        {donation.description}
                      </p>
                      <div className="mb-4">
                        <div className="h-[3px] rounded-full bg-gray-200">
                          <div
                            className="h-2/3 rounded-full bg-green-500"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>€{donation.currentAmount.toFixed(2)}</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center px-2 py-[6px] border border-teal-500 rounded-sm bg-transparent hover:bg-teal-500 text-teal-500 hover:text-white cursor-pointer">
                        <FiBookmark size={20} />
                      </div>
                      <button className="flex-1 ml-2 px-4 py-2 border border-teal-500 rounded-sm text-black bg-transparent hover:bg-teal-500 hover:text-white text-xs">
                        Donate now
                      </button>
                    </div>
                  </div>
                </div>
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
              href={"/donations"}
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

export default OpenDonationsList;
