"use client";
import React from "react";
import CountUp from "react-countup";

const MetricsOverview = () => {
  return (
    <section
      className="py-24 px-6 md:px-36 bg-gray-900 text-white"
      id="metrics"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-3 md:space-y-8">
        <h2 className="text-2xl md:text-4xl font-extrabold leading-snug pb-8">
          Help the Affected by{" "}
          <span className="text-yellow-400">Disasters</span>,{" "}
          <span className="text-yellow-400">Shortages</span>, and{" "}
          <span className="text-yellow-400">Emergency Relief</span>.
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 animate-pulse">
              <CountUp end={2085823} duration={2.5} separator="," />
            </p>
            <p className="mt-2 text-md md:text-xl">Total Beneficiaries</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 animate-pulse">
              <CountUp end={9407} duration={2.5} separator="," />
            </p>
            <p className="mt-2 text-md md:text-xl">Amount Donations</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 animate-pulse">
              <CountUp end={1587} duration={2.5} separator="," suffix=" BTC" />
            </p>
            <p className="mt-2 text-md md:text-xl">Bitcoin Donations Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsOverview;
