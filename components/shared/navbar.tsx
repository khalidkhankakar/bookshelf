"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import ProfilePopover from "./profile-popover";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    < >
      <nav className="flex items-center shadow-md bg-black shadow-white/10 justify-between px-8 p-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl flex items-center gap-x-2  font-bold text-[#00E599]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-[#00E599] rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
            BOOKSHELF
          </Link>

          <div className="hidden md:flex mx-7 items-center space-x-4">
            <NavItem href="/explore" title="Explore" />
            <NavItem href="/contribute" title="Contribute" />
            <NavItem href="#" title="About Us" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://github.com/khalidkhankakar/bookshelf" target="_blank" className="text-gray-300 hover:text-white">
            <Github className="h-6 w-6" />
          </Link>

          {session?.user ? (
            <ProfilePopover
              fullName={session?.user?.name || ""}
              avatarUrl={session?.user?.image || ""}
              email={session?.user?.email || ""}
              userId={session?.user?.id || ""}
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
          {session?.user && (
            <ProfilePopover
              fullName={session?.user?.name || ""}
              avatarUrl={session?.user?.image || ""}
              email={session?.user?.email || ""}
              userId={session?.user?.id || ""}
            />
          )}
          <button
            className="md:hidden "
            onClick={() => setIsMenuOpen((prev) => !prev)}
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
        <div className="md:hidden px-3 ">
          <NavItem href="/explore" title="Explore" />
          <NavItem href="/contribute" title="Contribute" />
          <NavItem href="#" title="About Us" />
          {session?.user ? (
            <Button
              onClick={() => signOut()}
              className="block text-gray-300 hover:text-white"
            >
              Log Out
            </Button>
          ) : (
            <div className="mt-4 space-y-2">
              <Link
                href="/auth/sign-in"
                className="block text-white bg-black cursor-pointer  hover:bg-gray-300 "
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
}: {
  title: string;
  href: string;
}) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="text-gray-300 hover:text-white py-2 flex items-center cursor-pointer"
      >
        {title}
      </Link>
    </div>
  );
}
