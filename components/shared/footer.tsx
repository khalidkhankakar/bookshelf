import Link from 'next/link'
const Footer = () => {
  return (
<footer className="text-gray-400 mt-12  bg-white/5 body-font">
  <div className="container py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <Link href={'/'}className="flex title-font font-medium items-center md:justify-start justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-teal-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">Bookshelf</span>
      </Link>
      <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">First Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Second Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Third Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">First Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Second Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Third Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">First Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Second Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Third Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Fourth Link</Link>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CATEGORIES</h2>
        <nav className="list-none mb-10">
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">First Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Second Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Third Link</Link>
          </li>
          <li>
            <Link href={'/'}className="text-gray-400 hover:text-white">Fourth Link</Link>
          </li>
        </nav>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer
