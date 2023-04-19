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
    <div className="w-5/6 mx-auto font-cormorant py-8 mt-6 md:mt-0 border-t border-neutral-200">
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
        <div className="flex justify-center gap-2 py-2">
          <Link to={'https://www.facebook.com/papercreationsbystacey'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="grey"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </Link>

          <p className="hidden">ico</p>
          <p className="hidden">ico</p>
          <p className="hidden">ico</p>
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
        ©2023 Ashton George & Paper Creations, built with Shopify
      </div>
    </div>
  );
}
