import React from "react";

const MetricsOverview = () => {
  return (
    <section
      className="py-24 px-6 md:px-36 bg-gray-900 text-white"
      id="metrics"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-snug pb-8">
          Help the Affected by{" "}
          <span className="text-yellow-400">Disasters</span>,{" "}
          <span className="text-yellow-400">Shortages</span>, and{" "}
          <span className="text-yellow-400">Emergency Relief</span>.
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-5xl font-bold text-yellow-400 animate-pulse">
              2,085,823
            </p>
            <p className="mt-2 text-xl">Total Beneficiaries</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-5xl font-bold text-yellow-400 animate-pulse">
              9,407
            </p>
            <p className="mt-2 text-xl">Amount Donations</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-5xl font-bold text-yellow-400 animate-pulse">
              1,587 BTC
            </p>
            <p className="mt-2 text-xl">Bitcoin Donations Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsOverview;
