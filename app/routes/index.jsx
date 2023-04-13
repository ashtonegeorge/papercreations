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
    <section className="w-full gap-4 overflow-hidden ">
      <div
        className={`w-full h-[33vw] bg-cover bg-no-repeat font-open text-white text-center flex align-middle justify-items-center`}
        style={{
          backgroundImage: `url(${featuredCollection.collection.image.url})`,
        }}
      >
        <div className="mx-auto my-auto bg-black bg-opacity-50 p-3 rounded-2xl">
          <h2 className="text-5xl font-extrabold">
            Shop {featuredCollection.collection.title}
          </h2>
          <h3 className="text-2xl font-bold py-4">
            {featuredCollection.collection.description}
          </h3>
          <Link
            to={`/collections/${featuredCollection.collection.handle}`}
            className="focus:outline-none text-black bg-palette-tea hover:bg-palette-sand transition ease font-semibold rounded-lg text-md px-5 py-2.5 my-5"
          >
            {featuredCollection.collection.title}
          </Link>
        </div>
      </div>

      {/* perhaps expand upon this at a later date */}
      {/* <CollectionCarousel featuredCollection={featuredCollection} /> */}

      <h2 className="font-bold text-lead text-4xl font-cormorant pt-12 text-center">
        Shop by Collection
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3 items-center p-12">
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
                    <Link
                      to={`/collections/${collection.handle}`}
                      className="bg-palette-tea hover:bg-neutral-50 transition ease focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex ml-auto"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      </svg>
                      Shop
                    </Link>
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
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3 items-center p-12">
          {products.nodes.map((product) => (
            <Link to={`/products/${product.handle}`} key={product.title}>
              <div
                className="grid bg-neutral-100 rounded-lg shadow-lg aspect-[2/3] bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${product.featuredImage.url})`,
                }}
              >
                <div className="flex justify-between self-end p-4 bg-palette-tea bg-opacity-60 rounded-b-lg">
                  <h5 className="font-bold text-xl text-center self-center font-open line-clamp-1">
                    {product.title}
                  </h5>
                  <Money
                    withoutTrailingZeros
                    data={product.priceRange.minVariantPrice}
                    className="font-bold text-xl text-center self-center font-open line-clamp-1"
                  />
                </div>
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
