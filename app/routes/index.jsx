// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {Money} from '@shopify/hydrogen-react';

export const meta = () => {
  return {
    title: 'Paper Creations by Stacey',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return defer({
    collections: await context.storefront.query(COLLECTIONS_QUERY),
    featuredCollection: await context.storefront.query(
      FEATURED_COLLECTION_QUERY,
    ),
    products: await context.storefront.query(PRODUCTS_QUERY),
  });
}

export default function Index() {
  const {collections} = useLoaderData().collections;
  const featuredCollection = useLoaderData().featuredCollection;
  const {products} = useLoaderData().products;

  return (
    <section className="w-full gap-4 overflow-hidden">
      <div
        className={`w-full aspect-[8/3] bg-contain bg-no-repeat font-open text-white text-center flex align-middle justify-items-center`}
        style={{
          backgroundImage: `url(${featuredCollection.collection.image.url})`,
        }}
      >
        <div className="mx-auto my-auto bg-black bg-opacity-50 p-3 rounded-2xl">
          <h2 className="text-2xl md:text-5xl font-extrabold">
            Shop {featuredCollection.collection.title}
          </h2>
          <h3 className="text-md md:text-2xl font-bold py-4">
            {featuredCollection.collection.description}
          </h3>
          <Link
            to={`/collections/${featuredCollection.collection.handle}`}
            className="focus:outline-none text-black bg-palette-tea hover:bg-palette-sand transition ease font-semibold rounded-lg text-sm md:text-md px-5 py-2.5 my-5"
          >
            {featuredCollection.collection.title}
          </Link>
        </div>
      </div>

      <h2 className="font-bold text-lead text-4xl font-cormorant pt-3 md:pt-12 text-center">
        Shop by Collection
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3 items-center p-6 md:p-12">
        {collections.nodes.map((collection) => {
          if (collection.id !== 'gid://shopify/Collection/441780175154') {
            return (
              <Link
                to={`/collections/${collection.handle}`}
                key={collection.id}
              >
                <div
                  className="grid border border-gray-200 rounded-lg shadow aspect-square bg-no-repeat bg-contain h-full"
                  style={{
                    backgroundImage: `url(${collection.image.url})`,
                  }}
                >
                  <div className="flex justify-evenly self-end p-4 bg-palette-sand bg-opacity-60">
                    <h2 className="font-bold text-xl text-center self-center font-open line-clamp-1">
                      {collection.title}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <div>
        <h1 className="font-cormorant font-bold text-4xl text-center">
          Shop by product
        </h1>
        <div className="grid-flow-row grid gap-y-4 md:gap-y-12 md:gap-4 gap-6 grid-cols-2 sm:grid-cols-3 items-center p-6 md:p-12">
          {products.nodes.map((product) => (
            <Link
              to={`/products/${product.handle}`}
              key={product.title}
              className="border-palette-tea border-2 md:border-none rounded-lg"
            >
              <div
                className="grid bg-neutral-100 rounded-t-lg md:rounded-lg shadow-lg aspect-[2/3] bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${product.featuredImage.url})`,
                }}
              >
                <div className="hidden md:flex justify-between self-end p-2 md:p-4 bg-palette-tea bg-opacity-60 rounded-b-lg">
                  <h5 className="font-bold text-md text-center self-center font-open line-clamp-1">
                    {product.title}
                  </h5>
                  <Money
                    withoutTrailingZeros
                    data={product.priceRange.minVariantPrice}
                    className="font-medium text-md text-neutral-700 text-center self-center font-open line-clamp-1"
                  />
                </div>
              </div>
              <div className="block md:hidden justify-between self-end p-2 md:p-4 bg-neutral-200 bg-opacity-60 rounded-b-lg">
                <h5 className="font-bold py-2 text-md text-center self-center font-open line-clamp-1">
                  {product.title}
                </h5>
                <Money
                  withoutTrailingZeros
                  data={product.priceRange.minVariantPrice}
                  className="font-medium text-sm text-neutral-400 text-center self-center font-open line-clamp-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 6) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

const FEATURED_COLLECTION_QUERY = `#graphql
  query Featured_Collection {
    collection(id: "gid://shopify/Collection/441780175154") {
    		id
        title
        handle
        description
        image {
          url
          width
          height
        }
      }
    }
`;

const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 12) {
      nodes {
        id
        title
        handle
        vendor
        descriptionHtml
        featuredImage {
          url
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
