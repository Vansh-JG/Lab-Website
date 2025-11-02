"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Button } from "@/components/ui/button";

type MenuItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      submenu: { label: string; href: string }[];
    };

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  {
    label: "People",
    submenu: [{ label: "The Team", href: "/the-team" }],
  },
  { label: "Publications", href: "/publications" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

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
            "href" in item ? (
              <Link key={item.label} href={item.href} className="text-white hover:text-gray-400 transition">
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setPeopleDropdownOpen((prev) => !prev)}
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
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-white text-center hover:bg-gray-800"
                        onClick={() => setPeopleDropdownOpen(false)}
                      >
                        {sub.label}
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
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white text-2xl focus:outline-none"
          variant="ghost"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden w-full bg-black transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-4">
          {menuItems.map((item) =>
            "href" in item ? (
              <li key={item.label} className="p-3 border-b border-gray-700">
                <Link
                  href={item.href}
                  className="text-white block hover:text-gray-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label} className="p-3 border-b border-gray-700">
                <span className="text-white block">{item.label}</span>
                <ul className="pl-4">
                  {item.submenu.map((sub) => (
                    <li key={sub.href} className="py-2">
                      <Link
                        href={sub.href}
                        className="text-white block hover:text-gray-400 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
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
