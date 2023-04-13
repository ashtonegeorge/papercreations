// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import moment from 'moment';

export const meta = () => {
  return {
    title: 'Paper Creations by Stacey',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return defer({
    blogs: await context.storefront.query(BLOGS_QUERY),
    articles: await context.storefront.query(RECENT_ARTICLES_QUERY),
  });
}

export default function Blog() {
  const imagePaths = [
    '/build/papercreations.jpeg',
    '/build/storefront.jpeg',
    '/build/event.jpeg',
  ];
  const data = useLoaderData();
  const {blogs} = data.blogs;
  const {articles} = data.articles;

  return (
    <div className="w-full h-full">
      <header>
        <h1 className="font-cormorant font-bold text-center text-5xl pb-4">
          Welcome to the blog section!
        </h1>
        <h2 className="font-cormorant font-normal text-3xl mx-auto w-2/3">
          Here, you can learn about the exciting things happening at Paper
          Creations from a variety of subjects and articles.
        </h2>
      </header>
      <main>
        <div>
          <section className="py-12">
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3 items-center p-12">
              {blogs.nodes.map((blog, index) => (
                <Link to={`/blogs/${blog.handle}`} key={blog.id}>
                  <div
                    className="grid border border-gray-200 rounded-lg shadow aspect-square bg-no-repeat bg-contain h-full"
                    style={{
                      backgroundImage: `url(${imagePaths[index]})`,
                    }}
                  >
                    <div className="flex justify-evenly self-end p-4 bg-palette-sand bg-opacity-60">
                      <h2 className="font-medium text-3xl text-center self-center font-open line-clamp-1">
                        {blog.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-cormorant font-bold text-4xl pb-12 text-center">
              Read the newest posts from Paper Creations
            </h2>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3 items-center p-12">
              {articles.nodes.map((article) => (
                <div
                  className="grid border border-gray-200 rounded-lg shadow aspect-square bg-no-repeat bg-cover h-full"
                  key={article.id}
                  style={{
                    backgroundImage: `url(${article.image.url})`,
                  }}
                >
                  <div className="bg-palette-tea bg-opacity-80 rounded-b-lg block mt-auto">
                    <div className="flex w-full justify-center self-end">
                      <h5 className="font-bold lg:w-80 text-lg text-center self-center font-open truncate">
                        {article.title}
                      </h5>
                    </div>
                    <div className="flex w-full justify-center self-end text-sm">
                      <h5 className="text-center self-center font-open truncate px-2">
                        {article.authorV2.name}
                      </h5>
                      <h5 className="text-center self-center font-open truncate px-2">
                        {moment(article.publishedAt).format('MMMM Do, YYYY')}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const BLOGS_QUERY = `#graphql
  query BlogDetails {
       blogs(first: 3) {
         nodes {
           id
           title
           handle
           authors {
             name
           }
           articles(first:1) {
             nodes {
               id
               image {
                 url
               }
             }
           }
         }
       }
     }
`;

const RECENT_ARTICLES_QUERY = `#graphql
  query RecentArticles {
    articles(first: 6) {
      nodes {
        id
        handle
        content
        title
        excerpt
        publishedAt
        blog {
          handle
        }
        authorV2 {
          name
        }
        image {
          url
        }
      }
    }
  }
`;

// AIzaSyAzCO09mhvJvZAApcA_-Y5oxrrGLVRwe7Q