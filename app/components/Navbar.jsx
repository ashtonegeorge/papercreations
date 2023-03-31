/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */
import {Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {Drawer, useDrawer} from '~/components/Drawer';
import {useMatches, NavLink} from '@remix-run/react';

export function Navbar(title) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const [root] = useMatches();
  const cart = root.data?.cart;

  return (
    <>
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
          <NavLink>shop</NavLink>
          <NavLink>social</NavLink>
          <NavLink>visit</NavLink>
          <NavLink>blog</NavLink>
        </div>

        <div className="flex gap-12 w-full items-center">
          <a className="font-bold" href="/">
            {title}
          </a>
          <CartHeader cart={cart} openDrawer={openDrawer} />
        </div>
      </header>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <h2>TODO Cart Data</h2>
      </Drawer>
    </>
  );
}

function CartHeader({cart, openDrawer}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <button
            className="relative ml-auto flex items-center justify-center w-8 h-8"
            onClick={openDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <title>Bag</title>
              <path
                fillRule="evenodd"
                d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
              ></path>
            </svg>
            {data?.totalQuantity > 0 && (
              <div className="text-contrast bg-red-500 text-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
                <span>{data?.totalQuantity}</span>
              </div>
            )}
          </button>
        )}
      </Await>
    </Suspense>
  );
}
