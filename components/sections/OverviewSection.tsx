"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const OverviewSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-10 px-6 md:px-36" id="faq">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 lg:w-2/4 ">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 text-center md:text-left">
              Decentralized Crowdfunding Platform
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
              Distribute funds <span className="text-teal-500">securely</span>,
              <span className="text-teal-500"> efficiently</span>, and{" "}
              <span className="text-teal-500">transparently</span>.
            </h2>
            <p className="text-sm md:text-base text-gray-500 mb-6 text-left">
              Leveraging blockchain technology, our platform ensures that your
              contributions are traceable, transparent, and free from
              intermediaries. Empower communities and fund innovative projects
              with confidence.
            </p>
            <Link
              href="#"
              className="text-teal-500 text-sm hover:underline text-left flex flex-row items-center gap-2"
            >
              Learn more about our technology <FaArrowRightLong size={15} />
            </Link>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              "What is Web3 crowdfunding?",
              "How secure is my contribution?",
              "Can I track where my funds go?",
              "How do I start a project?",
            ].map((question, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex items-center justify-between w-full p-4 bg-gray-100"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-gray-700 text-sm md:text-base">
                    {question}
                  </span>
                  {openFAQ === index ? (
                    <FiChevronUp className="text-teal-500" />
                  ) : (
                    <FiChevronDown className="text-teal-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="p-4 text-sm md:text-base text-gray-500">
                    {index === 0 &&
                      "Web3 crowdfunding leverages blockchain technology to create decentralized funding mechanisms, ensuring transparency and security."}
                    {index === 1 &&
                      "Your contributions are secured on the blockchain, making them tamper-proof and fully traceable."}
                    {index === 2 &&
                      "Yes, all transactions are recorded on the blockchain, allowing you to track the flow of funds in real-time."}
                    {index === 3 &&
                      "To start a project, you need to create a smart contract that defines the terms and conditions of your crowdfunding campaign."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
