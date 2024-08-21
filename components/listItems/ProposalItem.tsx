import { ProposalItemTypes } from "@/types/ProposalItemTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiBookmark } from "react-icons/fi";

interface ProposalItemProps {
  proposal: ProposalItemTypes;
  progress: number;
}

const ProposalItem = ({ proposal, progress }: ProposalItemProps) => {
  return (
    <div
      key={proposal?.id}
      className="flex flex-col w-full sm:w-1/5 md:w-1/2 lg:w-1/4 border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <Image
          src={proposal?.image}
          alt={proposal?.title}
          width={400}
          height={300}
          className="w-full h-44 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-center text-gray-500 text-xs mb-1">
            <span>{proposal?.date}</span>
            <span>{proposal?.donationsCount} donations</span>
          </div>
          <h3 className="text-md font-bold text-gray-800 mb-2">
            {proposal?.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2 h-16 overflow-hidden">
            {proposal?.description}
          </p>
          <div className="mb-4">
            <div className="h-[3px] rounded-full bg-gray-200">
              <div
                className="h-[80%] rounded-full bg-green-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>${proposal?.currentAmount.toFixed(2)}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center px-2 py-[6px] border border-teal-500 rounded-sm bg-transparent hover:bg-teal-500 text-teal-500 hover:text-white cursor-pointer">
            <FiBookmark size={20} />
          </div>
          <Link
            href={`/proposals/${proposal.id}`}
            className="flex w-full justify-end"
          >
            <button className="flex-1 ml-2 px-4 py-2 border border-teal-500 rounded-sm text-black bg-transparent hover:bg-teal-500 hover:text-white text-xs">
              Donate now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProposalItem;
