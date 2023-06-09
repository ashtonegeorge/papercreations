/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable hydrogen/prefer-image-component */
import {Drawer, useDrawer} from '~/components/Drawer';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import Footer from '~/components/Footer.jsx';
import {Suspense, useEffect} from 'react';
import {Await, Link, NavLink, useMatches, useFetchers} from '@remix-run/react';
import 'flowbite';

export function Layout({children, title, bannerMsg}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const fetchers = useFetchers();
  const [root] = useMatches();
  const cart = root.data?.cart;
  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }
  const activeStyle = 'font-bold';

  const inactiveStyle = 'font-normal';

  const activeStyleSmall =
    'block font-bold py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0';

  const inactiveStyleSmall =
    'block font-normal py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0';
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <header role="banner" className="font-open">
        <div className="text-center bg-palette-clay py-1 px-4 text-xs md:text-md lg:text-lg">
          <h2>{bannerMsg}</h2>
        </div>
        <div className="flex items-center h-16 p-6 md:p-8 lg:p-12 top-0 justify-between w-full leading-none gap-4">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex md:hidden items-center text-sm text-gray-500 rounded-lg"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <Link to="/" className="w-1/3 ">
            <img
              className="h-8 md:h-12 lg:h-24 mx-auto lg:mx-0 aspect-[16/4] md:aspect-auto"
              src="/build/tpbglogo.png"
              alt={title}
            />
          </Link>

          <div className="hidden md:flex justify-evenly w-1/3 text-md md:text-xl lg:text-3xl xl:text-4xl font-cormorant font-normal">
            <NavLink
              to="/"
              className={({isActive}) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              shop
            </NavLink>
            <NavLink
              to="/social"
              className={({isActive}) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              social
            </NavLink>
            <NavLink
              to="/visit"
              className={({isActive}) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              visit
            </NavLink>
            <NavLink
              to="/blog"
              className={({isActive}) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              blog
            </NavLink>
          </div>
          <div className="">
            <CartHeader cart={cart} openDrawer={openDrawer} />
          </div>
        </div>
        <div
          className="hidden absolute z-99 w-full md:hidden md:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 border border-gray-100 bg-gray-50 divide-y divide-neutral-400">
            <li>
              <NavLink
                to="/"
                className={({isActive}) =>
                  isActive ? activeStyleSmall : inactiveStyleSmall
                }
              >
                shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/social"
                className={({isActive}) =>
                  isActive ? activeStyleSmall : inactiveStyleSmall
                }
              >
                social
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/visit"
                className={({isActive}) =>
                  isActive ? activeStyleSmall : inactiveStyleSmall
                }
              >
                visit
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({isActive}) =>
                  isActive ? activeStyleSmall : inactiveStyleSmall
                }
              >
                blog
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
      <main
        role="main"
        id="mainContent"
        className="flex-grow w-full lg:bg-palette-tea"
      >
        <div className="max-w-5xl mx-auto bg-neutral-50">{children}</div>
      </main>
      <footer role="contentinfo" className="">
        <Footer />
      </footer>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>
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

function CartDrawer({cart, close}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col space-y-7 justify-between items-center md:py-8 md:px-12 px-4 py-6">
                    <CartLineItems linesObj={data.lines} />
                  </div>
                </div>
                <div className="w-full md:px-12 px-4 py-6 space-y-6">
                  <CartSummary cost={data.cost} />
                  <CartActions checkoutUrl={data.checkoutUrl} />
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                  Your bag is empty
                </h2>
                <button
                  onClick={close}
                  className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}
