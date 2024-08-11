import React from "react";
import Image from "next/image";

const MetricsOverview = () => {
  return (
    <section className="py-12 px-6 md:px-36">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Humanitarian Mission
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Help the Affected by{" "}
            <span className="text-teal-500">Disasters</span>,{" "}
            <span className="text-teal-500">Shortages</span>, and{" "}
            <span className="text-teal-500">Emergency Relief</span>.
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="text-teal-500">22,690</span> Donations have been
              verified and still active.
            </p>
            <p>
              <span className="text-teal-500">6,450</span> Donations have been
              distributed to disaster-affected areas.
            </p>
            <p>
              <span className="text-teal-500">1.4 Billion</span> total funds
              raised so far.
            </p>
            <p>
              <span className="text-teal-500">10,517</span> donations have been
              distributed to the needy.
            </p>
            <p>
              <span className="text-teal-500">5,058</span> donations were
              distributed to social foundations and orphanages.
            </p>
            <p>
              <span className="text-teal-500">4,803</span> donations have been
              distributed to people in emergency situations.
            </p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm md:max-w-md">
            <Image
              src="/images/elipses.png"
              alt="Humanitarian aid"
              className="rounded-full object-cover"
              width={270}
              height={270}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-teal-500 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsOverview;
