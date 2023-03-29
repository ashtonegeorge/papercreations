/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */
import {Link} from '@remix-run/react';

export function Navbar(title) {
  return (
    <header
      role="banner"
      className={`flex items-center h-16 p-6 md:p-8 lg:p-12 top-0 justify-evenly w-full leading-none gap-4 antialiased transition shadow-sm `}
    >
      <Link to="/">
        <img
          className="w-auto h-44 aspect-video"
          src="/build/tpbglogo.png"
          alt={title}
        />
      </Link>

      <div className="flex justify-evenly w-1/3 text-3xl font-amatic font-bold">
        <h2>shop</h2>
        <h2>social</h2>
        <h2>visit</h2>
        <h2>blog</h2>
      </div>
    </header>
  );
}
