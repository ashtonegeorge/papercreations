// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoaderData, Link} from '@remix-run/react';
import {defer} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';

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
            <div className="grid grid-cols-3 gap-12 w-full h-full">
              {blogs.nodes.map((blog, index) => (
                <div className="" key={blog.id}>
                  <div>
                    <Link
                      to={`/blogs/${blog.handle}`}
                      className="w-full h-full bg-stone-200"
                    >
                      <img
                        alt={blog.title}
                        src={imagePaths[index]}
                        key={blog.id}
                        className="relative"
                      />
                      <div>
                        <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy text-black text-2xl">
                          {blog.title}
                        </h2>
                        <h3>{blog.authors[0].name}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-cormorant font-normal text-3xl pb-12 text-center">
              Read the newest posts from Paper Creations
            </h2>
            <div className="grid grid-cols-3 gap-12 w-full h-full">
              {articles.nodes.map((article) => (
                <div className="" key={article.id}>
                  <div>
                    <Link
                      to={`/blogs/${article.handle}`}
                      className="w-3/4 h-full bg-stone-200"
                    >
                      <img
                        alt={article.title}
                        src={article.image.url}
                        key={article.id}
                        className="relative"
                      />
                      <div>
                        <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy text-black text-2xl">
                          {article.title}
                        </h2>
                        <h3>{article.authorV2.name}</h3>
                      </div>
                    </Link>
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
