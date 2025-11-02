"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPeopleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    "Home",
    "Research",
    { label: "People", submenu: ["The-Team", "Alumni"] },
    "Publications",
    "Resources",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 w-full bg-black shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-2 sm:py-4">
        <Link
          href="/"
          className="text-xl sm:text-3xl font-bold text-white mx-auto sm:mx-0 text-center"
        >
          Venugopal Lab
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) =>
            typeof item === "string" ? (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-gray-400 transition"
              >
                {item}
              </Link>
            ) : (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setPeopleDropdownOpen(!peopleDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-gray-400 transition cursor-default"
                  aria-haspopup="true"
                  aria-expanded={peopleDropdownOpen}
                >
                  {item.label}
                  {peopleDropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                {peopleDropdownOpen && (
                  <div className="absolute bg-black mt-2 rounded shadow-md min-w-[150px]">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub}
                        href={`/${sub.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 text-white text-center hover:bg-gray-800"
                        onClick={() => setPeopleDropdownOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
          variant="ghost"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden w-full bg-black transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col p-4">
          {menuItems.map((item) =>
            typeof item === "string" ? (
              <li key={item} className="p-3 border-b border-gray-700">
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white block hover:text-gray-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ) : (
              <li key={item.label} className="p-3 border-b border-gray-700">
                <span className="text-white block">{item.label}</span>
                <ul className="pl-4">
                  {item.submenu.map((sub) => (
                    <li key={sub} className="py-2">
                      <Link
                        href={`/${sub.toLowerCase().replace(" ", "-")}`}
                        className="text-white block hover:text-gray-400 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
