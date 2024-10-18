import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-gray-400 mt-12 bg-white/5 body-font">
      <div className="container py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Logo and Short Description */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-[#00E599] rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-[#00E599] text-xl">BOOKSHELF</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">Your personalized online library. Explore books, save favorites, and start reading today!</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Categories Section */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'/category/fiction'} className="text-gray-400 hover:text-white">Fiction</Link>
              </li>
              <li>
                <Link href={'/category/non-fiction'} className="text-gray-400 hover:text-white">Non-Fiction</Link>
              </li>
              <li>
                <Link href={'/category/romance'} className="text-gray-400 hover:text-white">Romance</Link>
              </li>
              <li>
                <Link href={'/category/scifi'} className="text-gray-400 hover:text-white">Sci-Fi</Link>
              </li>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">QUICK LINKS</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'/about'} className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href={'/contact'} className="text-gray-400 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link href={'/faq'} className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link href={'/terms'} className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
            </nav>
          </div>

          {/* Social Media */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">FOLLOW US</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'https://twitter.com'} className="text-gray-400 hover:text-white">Twitter</Link>
              </li>
              <li>
                <Link href={'https://facebook.com'} className="text-gray-400 hover:text-white">Facebook</Link>
              </li>
              <li>
                <Link href={'https://instagram.com'} className="text-gray-400 hover:text-white">Instagram</Link>
              </li>
              <li>
                <Link href={'https://linkedin.com'} className="text-gray-400 hover:text-white">LinkedIn</Link>
              </li>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CONTACT US</h2>
            <nav className="list-none mb-10">
              <li className="text-gray-400">Email: support@bookshelf.com</li>
              <li className="text-gray-400">Phone: +123 456 7890</li>
              <li className="text-gray-400">Address: 123 Library Lane, Booktown, BK 56789</li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
