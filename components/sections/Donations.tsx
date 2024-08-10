"use client";
import React, { useState } from "react";
import Image from "next/image";

const OpenDonationsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const donations = [
    {
      id: 1,
      title: "Flood in Lamboa",
      date: "June 27, 2021",
      description:
        "Lamboa community needs your help for crisis management from 3 days of non-stop flooding.",
      image: "/images/flood-lamboa.jpg",
      donationsCount: 230,
    },
    {
      id: 2,
      title: "Tsunami in Malika",
      date: "June 27, 2021",
      description:
        "Emergency! A tsunami has just hit Malika, Treszoud District. Help our affected brothers and sisters.",
      image: "/images/tsunami-malika.jpg",
      donationsCount: 1089,
    },
    {
      id: 3,
      title: "Help African Children",
      date: "June 27, 2021",
      description:
        "African Children need your help to get proper food and water. Prolonged crisis is a real urgency.",
      image: "/images/help-african-children.jpg",
      donationsCount: 748,
    },
    {
      id: 4,
      title: "Sianka Forest Fire",
      date: "June 27, 2021",
      description:
        "The Sianka forest has caught fire and affected the surrounding community. Let’s help buy their health facilities!",
      image: "/images/sianka-forest-fire.jpg",
      donationsCount: 320,
    },
    {
      id: 5,
      title: "Soporo Earthquake",
      date: "June 27, 2021",
      description:
        "A magnitude 7.3 earthquake has shaken Soporo sub-district, help them recover with food and medicine.",
      image: "/images/soporo-earthquake.jpg",
      donationsCount: 769,
    },
    {
      id: 6,
      title: "Lidu Land Drought",
      date: "June 27, 2021",
      description:
        "The people of Tarah Lidu are currently suffering from drought, help them get clean water!",
      image: "/images/lidu-land-drought.jpg",
      donationsCount: 748,
    },
  ];

  const filteredDonations = donations.filter((donation) =>
    donation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation.id}
              className="max-w-sm w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <Image
                src={donation.image}
                alt={donation.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {donation.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{donation.date}</p>
                <p className="text-sm text-gray-700 mb-4">
                  {donation.description}
                </p>
                <p className="text-teal-500 text-sm font-bold mb-4">
                  {donation.donationsCount} donations
                </p>
                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-xs">
                  Donate now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-full text-xs text-white">
            Lihat semua →
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpenDonationsList;
