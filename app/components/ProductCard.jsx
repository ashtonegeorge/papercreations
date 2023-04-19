/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="border-palette-tea border-2 md:border-none rounded-lg"
    >
      {/* <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </label>
          )}
          <Image data={product.variants.nodes[0].image} alt={product.title} />
        </div> 
        <div
          className="grid bg-neutral-100 rounded-t-lg md:rounded-lg shadow-lg aspect-[2/3] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${product.featuredImage.url})`,
          }}
        >
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>*/}
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
            data={price}
            className="font-medium text-sm text-neutral-600 text-center self-center font-open line-clamp-1"
          />
          {isDiscounted && (
            <Money
              className="font-medium text-neutral-600 text-md text-center self-center font-open line-clamp-1"
              withoutTrailingZeros
              data={compareAtPrice}
            />
          )}
        </div>
      </div>
      <div className="block md:hidden justify-between self-end p-2 md:p-4 bg-neutral-200 bg-opacity-60 rounded-b-lg">
        <h5 className="font-bold py-2 text-md text-center self-center font-open line-clamp-1">
          {product.title}
        </h5>
        <Money
          withoutTrailingZeros
          data={price}
          className="font-medium text-sm text-neutral-600 text-center self-center font-open line-clamp-1"
        />
        {isDiscounted && (
          <Money
            className="line-through opacity-50 font-medium text-sm text-neutral-600 text-center self-center font-open line-clamp-1"
            withoutTrailingZeros
            data={compareAtPrice}
          />
        )}
      </div>
    </Link>
    //   <Link
    //   to={`/products/${product.handle}`}
    //   key={product.title}
    //   className="border-palette-tea border-2 md:border-none rounded-lg"
    // >
    //   <div
    //     className="grid bg-neutral-100 rounded-t-lg md:rounded-lg shadow-lg aspect-[2/3] bg-cover bg-no-repeat"
    //     style={{
    //       backgroundImage: `url(${product.featuredImage.url})`,
    //     }}
    //   >
    //     <div className="hidden md:flex justify-between self-end p-2 md:p-4 bg-palette-tea bg-opacity-60 rounded-b-lg">
    //       <h5 className="font-bold text-xl text-center self-center font-open line-clamp-1">
    //         {product.title}
    //       </h5>
    //       <Money
    //         withoutTrailingZeros
    //         data={product.priceRange.minVariantPrice}
    //         className="font-medium text-neutral-200 text-xl text-center self-center font-open line-clamp-1"
    //       />
    //     </div>
    //   </div>
    //   <div className="block md:hidden justify-between self-end p-2 md:p-4 bg-neutral-200 bg-opacity-60 rounded-b-lg">
    //     <h5 className="font-bold py-2 text-md text-center self-center font-open line-clamp-1">
    //       {product.title}
    //     </h5>
    //     <Money
    //       withoutTrailingZeros
    //       data={product.priceRange.minVariantPrice}
    //       className="font-medium text-sm text-neutral-600 text-center self-center font-open line-clamp-1"
    //     />
    //   </div>
    // </Link>
  );
}
