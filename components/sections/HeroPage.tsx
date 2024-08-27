"use client";
import { AuthContext } from "@/context/AuthContext";
import { links } from "@/public/data/navlinks";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

export const HeroPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/images/hero-image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 py-2 sm:px-8 sm:py-4">
          <Link href="" className="flex items-center space-x-4 sm:space-x-8">
            <div className="w-24 sm:w-28">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Logo"
                className="w-full h-auto"
              />
            </div>
          </Link>

          <div className="sm:hidden">
            <button onClick={toggleNav} className="text-white">
              {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-white pt-1">
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="hover:text-teal-500 text-xs"
              >
                {link.text}
              </Link>
            ))}
            {currentUser ? (
              <div className="relative">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-xs"
                  onClick={toggleDropdown}
                >
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-xs">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-gray-800 text-white transition-transform transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleNav} className="text-white">
              <FiX size={24} />
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-4 p-4">
            {links.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="text-lg hover:text-teal-500">
                  {link.text}
                </Link>
              </li>
            ))}
            {currentUser ? (
              <div className="relative">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-xs"
                  onClick={toggleDropdown}
                >
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-full text-xs">
                  Get Started
                </button>
              </Link>
            )}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 mt-36 sm:mt-28">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#13ADB7]">Happiness {""}</span>comes from{" "}
              {""}
              <span className="text-[#13ADB7]">your actions</span>.
            </h1>
            <p className="mb-8 text-xs text-[#E9ECEB]">
              Be a part of the breakthrough and make someone's dream come true.
            </p>
          </div>
          <div className="flex flex-row space-x-4">
            <Link href="#open-proposals">
              <button className="flex items-center justify-center px-8 py-4 md:py-3 bg-teal-500 hover:bg-teal-600 rounded-full text-xs">
                Donate now
              </button>
            </Link>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-slate-100 text-white hover:bg-gray-600 rounded-full text-xs">
              <BsPlayCircle fontSize="18px" />
              Watch video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
