import React from "react";
import Image from "next/image";
import { partners } from "@/public/data/partners";

export const PartnersOverview = () => {
  return (
    <section className="py-12 px-6 md:px-36 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Our Partners
        </h3>
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          More than 50 <span className="text-teal-500">Companies</span> and{" "}
          <span className="text-teal-500">Institutions</span> that trust us over
          the years
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4 bg-white shadow-sm rounded-lg"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          ))}
          <div className="flex justify-center items-center p-4 bg-white shadow-sm rounded-lg">
            <span className="text-gray-500 font-semibold">and 42 more</span>
          </div>
        </div>
        <div className="mt-8 p-6 bg-teal-500 text-white rounded-lg flex flex-col md:flex-row md:items-center">
          <div className="mb-4 md:mb-0 md:mr-8">
            <p className="font-semibold">CALL CENTER</p>
            <p className="text-lg">(234) 1117-555</p>
          </div>
          <div>
            <p className="font-semibold">EMAIL</p>
            <p className="text-lg">info@relieffinance.org</p>
          </div>
        </div>
      </div>
    </section>
  );
};
