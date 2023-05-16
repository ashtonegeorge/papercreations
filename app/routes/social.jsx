// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoaderData, Link} from '@remix-run/react';
import moment from 'moment';
import {useState, useEffect} from 'react';

export async function loader({context}) {
  const environment = await context.env;

  return environment;
}

export default function Social() {
  const [posts, setPosts] = useState([]);
  const env = useLoaderData();

  useEffect(() => {
    const getFacebookPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/${env.PUBLIC_FACEBOOK_PAGE_ID}/posts?fields=message,created_time,full_picture,permalink_url&access_token=${env.PUBLIC_FACEBOOK_ACCESS_TOKEN}&limit=12`,
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFacebookPosts();
  }, [env.PUBLIC_FACEBOOK_ACCESS_TOKEN, env.PUBLIC_FACEBOOK_PAGE_ID]);

  if (posts.length === 0) {
    return <p className="w-full h-[100vh]">Loading...</p>;
  }

  return (
    <div>
      <h2 className="font-cormorant font-bold text-center text-3xl md:text-5xl pt-3 md:pt-12">
        Recent Facebook Posts
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 font-open items-center p-6 md:p-12 justify-center">
        {posts.map((post) => (
          <Link
            className="max-w-full h-full bg-white border border-gray-200 rounded-lg shadow w-3/4 md:w-1/3"
            key={post.id}
            to={post.permalink_url}
          >
            <div className="p-2 flex w-full items-center">
              <div className="w-4/5">
                <div>
                  <h5 className="text-sm font-normal tracking-tight text-gray-900 ">
                    {moment(post.created_time).format('MMMM Do, YYYY')}
                  </h5>
                </div>
              </div>

              <div className="rounded-xl w-1/5 px-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="rounded-md fill-sky-500"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </div>
            </div>
            <div className="">
              {post.full_picture && (
                <img
                  src={post.full_picture}
                  alt={post.message}
                  className="h-full rounded-xl px-2 py-2"
                />
              )}
            </div>
            <p className="font-semibold text-xs p-5 text-gray-700 truncate">
              {post.message ? post.message : null}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
