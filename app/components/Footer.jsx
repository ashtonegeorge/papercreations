// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {Link} from '@remix-run/react';

export const meta = () => {
  return {
    title: 'Paper Creations by Stacey',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export default function Footer() {
  return (
    <div className="w-5/6 mx-auto font-cormorant py-8 mt-6 md:mt-0 border-t border-stone-500">
      <div className="flex justify-center w-full text-center text-2xl font-bold py-6">
        <div className="w-1/6">
          <Link to="/" className="">
            Shop
          </Link>
        </div>
        <div className="w-1/6">
          <Link to="/social" className="">
            Social
          </Link>
        </div>
        <div className="w-1/6">
          <Link to="/visit" className="">
            Visit
          </Link>
        </div>
        <div className="w-1/6">
          <Link to="/blog" className="">
            Blog
          </Link>
        </div>
      </div>
      <div className="text-center text-2xl py-3">
        <h3>Connect with Us</h3>
        <div className="flex justify-center gap-2">
          <p>ico</p>
          <p>ico</p>
          <p>ico</p>
          <p>ico</p>
        </div>
      </div>
      <div>
        <img
          src="/build/tpbglogo.png"
          alt="Paper Creations by Stacey"
          className="mx-auto w-1/3 py-3"
        />
      </div>
      <div className="text-center py-3">
        ©2023 Ashton George & Paper Creations, built using Shopify
      </div>
    </div>
  );
}
