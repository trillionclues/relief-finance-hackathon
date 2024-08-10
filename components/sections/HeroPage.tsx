"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

export const HeroPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/images/hero-image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 py-2 sm:px-8 sm:py-4">
          <div className="flex items-center space-x-4 sm:space-x-8 pt-1">
            <div className="w-16 sm:w-24">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Logo"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleNav} className="text-white">
              {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-4 sm:space-x-6 text-white pt-1">
            <a href="#" className="hover:text-teal-500 text-xs">
              Home
            </a>
            <a href="#" className="hover:text-teal-500 text-xs">
              Charity
            </a>
            <a href="#" className="hover:text-teal-500 text-xs">
              Disaster
            </a>
            <a href="#" className="hover:text-teal-500 text-xs">
              Event
            </a>
            <a href="#" className="hover:text-teal-500 text-xs">
              Open Data
            </a>
            <a href="#" className="hover:text-teal-500 text-xs">
              (0351) 1117-555
            </a>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-black text-white transition-transform transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleNav} className="text-white">
              <FiX size={24} />
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-4 p-4">
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                Charity
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                Disaster
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                Event
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                Open Data
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-teal-500">
                (0351) 1117-555
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 mt-20 sm:mt-28">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#13ADB7]">Happiness {""}</span>comes from{" "}
              {""}
              <span className="text-[#13ADB7]">your action</span>.
            </h1>
            <p className="mb-8 text-xs text-[#E9ECEB]">
              Be a part of the breakthrough and make someone's dream come true.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-full text-xs">
              Donate now
            </button>
            <button className="flex flex-row justify-center items-center gap-2 px-4 py-2 bg-transparent border border-slate-100 text-white hover:bg-gray-600 rounded-full text-xs">
              <BsPlayCircle fontSize="14px" />
              Watch video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
