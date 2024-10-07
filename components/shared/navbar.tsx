"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Github } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import ProfilePopover from "./profile-popover";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="flex items-center shadow-lg shadow-white/10 justify-between px-8 p-4">
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

          {session?.user ? (
            <ProfilePopover
              fullName={session?.user?.name || ""}
              avatarUrl={session?.user?.image || ""}
              email={session?.user?.email || ""}
              userId={session?.user?.id || ''}
            />
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth/sign-in"
                className="block text-gray-300 hover:text-white"
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                className="block bg-[#00E599] text-black px-4 py-2 rounded-md hover:bg-[#00C480] transition duration-300 text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
<div className="md:hidden flex items-center gap-x-4">

{session?.user && 
            <ProfilePopover
              fullName={session?.user?.name || ""}
              avatarUrl={session?.user?.image || ""}
              email={session?.user?.email || ""}
              userId={session?.user?.id || ''}
            />
}
        <button
          className="md:hidden "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        </div>

      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <NavItem href="/" title="Home" hasDropdown />
          <NavItem href="/" title="Pricing" />
          <NavItem href="/" title="Docs" />
          <NavItem href="/" title="Resources" hasDropdown />
          {session?.user ? (
              <Button
              onClick={()=>signOut()}
                className="block text-gray-300 hover:text-white"
              >
                Log Out
              </Button>
          ) : (
            <div className="mt-4 space-y-2">
              <Link
                href="/auth/sign-in"
                className="block text-gray-300 hover:text-white"
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                className="block bg-[#00E599] text-black px-4 py-2 rounded-md hover:bg-[#00C480] transition duration-300 text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
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
