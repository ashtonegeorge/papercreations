// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoadScript, GoogleMap} from '@react-google-maps/api';
import {useLoaderData, Link} from '@remix-run/react';

export async function loader({context}) {
  const mapsKey = await context.env.PUBLIC_MAPS_API_KEY;

  return mapsKey;
}

export default function Visit() {
  const mapsKey = useLoaderData();
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: mapsKey,
  });

  if (!isLoaded) return <div className="w-full h-[100vh]">loading...</div>;

  return (
    <main className="block w-full pb-6" id="map">
      <section className="hidden md:block md:w-full md:border-y-2 border-neutral-200 overflow-x-hidden z-0 relative">
        <GoogleMap
          mapContainerClassName="map-container"
          zoom={19}
          center={{lat: 40.011565, lng: -78.37193}}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        ></GoogleMap>
      </section>
      <section className="w-full md:w-full my-12 px-12">
        <div className="block md:flex justify-evenly font-open">
          <img
            src="/build/storefront.jpeg"
            alt="Paper Creations by Stacey"
            className="w-5/8 md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="pt-6 md:pt-0 w-5/8 md:w-1/3 block">
            <h2 className="">
              Come and visit Paper Creations by Stacey on Main Street in Everett
              at 108 E Main St, Everett, PA 15537
            </h2>
            <h2 className="py-12">
              Our doors are open ____ through ____ between ____ and ____.
            </h2>
            <Link
              to="https://goo.gl/maps/D51YN9qsBfGMXgBd8"
              className="flex  w-full  text-center justify-center"
            >
              <h2 className="hover:text-white hover:bg-palette-tea bg-palette-bean text-black transition ease rounded-lg shadow-lg text-sm w-1/2 px-5 py-2.5">
                Directions
              </h2>
            </Link>
          </div>
        </div>
      </section>
      <section className="block md:hidden md:w-full md:border-y-2 border-stone-700 overflow-x-hidden z-0 relative">
        <GoogleMap
          mapContainerClassName="map-container"
          zoom={19}
          center={{lat: 40.011565, lng: -78.37193}}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        ></GoogleMap>
      </section>
    </main>
  );
}
