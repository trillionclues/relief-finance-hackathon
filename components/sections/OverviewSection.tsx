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
              "What happens if my campaign doesn’t reach its goal?",
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
                    {index === 0 && (
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Web3 crowdfunding is a new way to raise and donate funds
                        using blockchain technology. It’s all about transparency
                        and making sure that the money goes directly to those
                        who need it, with no hidden fees or intermediaries.
                      </p>
                    )}
                    {index === 1 && (
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Your contribution is secured on the blockchain, which
                        means it’s tamper-proof and can’t be altered by anyone.
                        You can have peace of mind knowing that your donation is
                        safe from fraud or misuse and that it goes exactly where
                        you intend.
                      </p>
                    )}
                    {index === 2 && (
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Yes! You can track the progress of your donation in
                        real-time. We provide detailed reports and updates on
                        how your funds are being used, so you can see exactly
                        where your money is going.
                      </p>
                    )}
                    {index === 3 && (
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        Starting a project on Relief Finance is simple. You can
                        create a campaign by providing key details like the
                        project’s goals, funding target, and timeline. Once your
                        campaign is approved and live, people can start
                        contributing. The funds raised are held securely on the
                        platform, and if the campaign doesn’t reach its target,
                        the contributions are automatically returned to the
                        donors. This way, both you and your supporters are
                        protected throughout the process.
                      </p>
                    )}
                    {index === 4 && (
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        "If your campaign doesn’t meet its funding target, all
                        contributions will be automatically returned to the
                        donors. This ensures that no funds are misused or
                        withheld from contributors, fostering trust between you
                        and your supporters."
                      </p>
                    )}
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
