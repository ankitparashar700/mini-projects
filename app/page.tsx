

"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useOutsideClick } from './hooks/useOutsideClick';

const projectCards = [

  {
    title: 'Swagger Documentation',
    description: 'Interactive API documentation with OpenAPI/Swagger UI.',
    href: '/swagger',
    icon: '📚'
  },
  {
    title: 'Calendar Previewer',
    description: 'Interactive calendar with date selection and preview.',
    href: '/calendar-previewer',
    icon: '📅'
  },
  {
    title: 'Resume Builder',
    description: 'Create and export professional resumes with a simple form.',
    href: '/resume-builder',
    icon: '📄'
  },
  {
    title: 'Calculator',
    description: 'Modern calculator with basic arithmetic operations.',
    href: '/calculator',
    icon: '🧮'
  },
  {
    title: 'Card Flip Game',
    description: 'Memory game with card matching and flip animations.',
    href: '/card-flip-game',
    icon: '🎮'
  }
];

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  // Show first 3 links, rest in dropdown if screen is small
  const mainLinks = projectCards.slice(0, 3);
  const dropdownLinks = projectCards.slice(3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="text-xl font-bold text-blue-700">Mini Projects</div>
        <div className="flex gap-4 items-center relative">
          {mainLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-gray-700 hover:text-blue-700 font-medium transition">
              {link.title}
            </Link>
          ))}
          {dropdownLinks.length > 0 && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                onClick={() => setDropdownOpen(open => !open)}
              >
                More
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg min-w-[180px] z-20">
                  {dropdownLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center w-full pt-32 px-4">
        <h1 className="text-4xl font-bold mb-4 text-blue-800 text-center">Welcome to Mini Projects</h1>
        <p className="text-gray-600 text-center mb-8 max-w-lg">
          Explore and test various mini projects: APIs, documentation, tools, and games.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {projectCards.map(card => (
            <Link key={card.href} href={card.href} className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full border border-gray-200 hover:border-blue-300">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
