import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleStartInterview = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/interview');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">InterviewAI</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600">
                About
              </Link>
              <Link href="/pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600">
                Pricing
              </Link>
              <Link href="/faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600">
                FAQ
              </Link>
              <Link href="/companies" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600">
                Browse Companies
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleStartInterview}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Interview
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  {user.name}
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Log in
                </Link>
                <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
            Home
          </Link>
          <Link href="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
            About
          </Link>
          <Link href="/pricing" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
            Pricing
          </Link>
          <Link href="/faq" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
            FAQ
          </Link>
          <Link href="/companies" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
            Browse Companies
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <button
                onClick={handleStartInterview}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Interview
              </button>
            </div>
            <div className="mt-3 space-y-1">
              {user ? (
                <>
                  <Link href="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
                    {user.name}
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
                    Log in
                  </Link>
                  <Link href="/signup" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 