"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Github } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl  font-bold text-[#00E599]">
            BOOKSHELF
          </Link>

        <div className="hidden md:flex mx-9 items-center space-x-6">
        <NavItem href="/" title="Features" hasDropdown />
          <NavItem href="/" title="Pricing" />
          <NavItem href="/" title="Docs" />
          <NavItem href="/" title="Resources" hasDropdown />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="https://github.com/neondatabase"
            className="text-gray-300 hover:text-white"
          >
            <Github className="h-6 w-6" />
          </Link>
          
          <Link href="/login" className="text-gray-300 hover:text-white">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#00E599] text-black px-4 py-2 rounded-md hover:bg-[#00C480] transition duration-300"
          >
            Sign Up
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <NavItem href="/" title="Home" hasDropdown />
          <NavItem href="/" title="Pricing" />
          <NavItem href="/" title="Docs" />
          <NavItem href="/" title="Resources" hasDropdown /> 
          <div className="mt-4 space-y-2">
            <Link
              href="/login"
              className="block text-gray-300 hover:text-white"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block bg-[#00E599] text-black px-4 py-2 rounded-md hover:bg-[#00C480] transition duration-300 text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

function NavItem({
  title,
  href,
  hasDropdown = false,
}: {
  title: string;
  href: string;
  hasDropdown?: boolean;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="text-gray-300 hover:text-white py-2 flex items-center"
      >
        {title}
        {hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
      </Link>
    </div>
  );
}
