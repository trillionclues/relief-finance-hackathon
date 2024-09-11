import { ProposalItemTypes } from "@/types/ProposalItemTypes";
import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface ProposalFundingHistoryProps {
  proposal: ProposalItemTypes;
}

const ProposalFundingHistory: React.FC<ProposalFundingHistoryProps> = ({
  proposal,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold flex items-center mb-4">
        🍻💚 Words of Support
      </h2>
      <div className="space-y-4">
        {proposal.supports &&
          proposal.supports.map((support, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg"
            >
              {support.avatar ? (
                <Image
                  src={support.avatar}
                  alt={`Supporter ${index + 1}`}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle size={36} className="text-gray-500" />
              )}
              <div>
                <p className="font-semibold text-sm">{support.name}</p>
                <p className="text-gray-600 text-xs">
                  ${support.amount} • {support?.timeAgo}
                </p>
                <p className="text-xs">{support.message}</p>
              </div>
            </div>
          ))}
        <button className="text-teal-500">Show more</button>
      </div>
    </div>
  );
};

export default ProposalFundingHistory;
