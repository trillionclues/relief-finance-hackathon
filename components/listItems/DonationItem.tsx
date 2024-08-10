import Image from "next/image";
import React from "react";

interface DonationItemProps {
  title: string;
  date: string;
  donations: number;
  description: string;
  imageUrl: string;
}

const DonationItem = ({
  title,
  date,
  donations,
  description,
  imageUrl,
}: DonationItemProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs">{date}</p>
        <h3 className="text-lg font-semibold text-gray-800 mt-1">{title}</h3>
        <p className="text-gray-500 text-xs mt-1">{donations} donations</p>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <button className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-xs">
          Donate now
        </button>
      </div>
    </div>
  );
};

export default DonationItem;
