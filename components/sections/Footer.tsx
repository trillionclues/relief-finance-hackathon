import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-36 flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-6 md:space-y-0">
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">About</h4>
            <ul className="space-y-2 text-white flex flex-col">
              <Link href="" className="hover:text-teal-500 text-sm">
                Partners
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                How-to
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                Helpdesk
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                Community
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4">
              Terms & Conditions
            </h4>
            <ul className="space-y-2 flex flex-col">
              <Link href="" className="hover:text-teal-500 text-sm">
                Report violations
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                Policy
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                Disclaimer
              </Link>
              <Link href="" className="hover:text-teal-500 text-sm">
                Missionary
              </Link>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-0 text-sm">
          <h4 className="text-sm font-semibold uppercase mb-4">Our Office</h4>
          <p className="mb-2">
            Eti Osa No. 18,
            <br />
            Ajah Admiralty, Lagos, Nigeria.
            <br />
            ZIP: 10000
          </p>
          <p className="mt-4 text-gray-500">
            ©{new Date().getFullYear()} Relief Finance Decentralized Crowdfund.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
