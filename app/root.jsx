import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {ShopifyProvider} from '@shopify/hydrogen-react';
import tailwind from './styles/tailwind-build.css';
import styles from './styles/app.css';
import favicon from '../public/favicon.ico';
import {Layout} from './components/Layout';
import {defer} from '@shopify/remix-oxygen';
import {CART_QUERY} from '~/queries/cart';

const shopifyConfig = {
  storefrontToken: '076f497b87ba42d22b51bb1480d95cc6',
  storeDomain: `https://papercreationsbystacey.myshopify.com/`,
  storefrontApiVersion: '2023-01' || '2023-01',
  countryIsoCode: 'US',
  languageIsoCode: 'en',
};

export const links = () => {
  return [
    {rel: 'stylesheet', href: tailwind},
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Cormorant+Garamond:wght@300;400;600;700&family=Open+Sans:wght@300;400;600;700;800&display=swap',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({context, request}) {
  const cartId = await context.session.get('cartId');

  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query(LAYOUT_QUERY),
    bannerMsg: await context.storefront.query(BANNER_QUERY),
  });
}

export default function App() {
  const data = useLoaderData();
  const bannerMessage = data.bannerMsg.metaobject.field.value;
  const {name, description} = data.layout.shop;

  return (
    <ShopifyProvider {...shopifyConfig}>
      <html lang="en">
        <head>
          <Seo />
          <Meta />
          <Links />
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
        </head>
        <body>
          <Layout title={name} bannerMsg={bannerMessage}>
            <Outlet />
          </Layout>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ShopifyProvider>
  );
}

async function getCart({storefront}, cartId) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }

  const {cart} = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;

const BANNER_QUERY = `#graphql
  query BannerMessage {
    metaobject(handle: {
      type: "banner_message",
      handle: "banner-text"
    }) {
      field(key: "content") {
        value
      }
    }
  }
`;
