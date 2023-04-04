// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useFetcher, Link} from '@remix-run/react';
import {useEffect, useState} from 'react';

export default function Blog({blog, url}) {
  const [nextPage, setNextPage] = useState(blog.articles.pageInfo.hasNextPage);

  const [endCursor, setEndCursor] = useState(blog.articles.pageInfo.endCursor);

  const [articles, setArticles] = useState(blog.articles.nodes || []);

  const fetcher = useFetcher();

  function fetchMoreArticles() {
    // ?index differentiates index routes from their parent layout routes
    // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
    fetcher.load(`${url}?index&cursor=${endCursor}`);
  }

  useEffect(() => {
    if (!fetcher.data) return;
    const blog = fetcher.data;

    setArticles((prev) => [...prev, ...blog.articles.nodes]);
    setNextPage(blog.articles.pageInfo.hasNextPage);
    setEndCursor(blog.articles.pageInfo.endCursor);
  }, [fetcher.data]);

  return (
    <>
      <main>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article) => (
            <div key={article.title}>
              <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
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
          ))}
        </div>

        {nextPage && (
          <div className="flex items-center justify-center mt-6">
            <button
              className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer"
              disabled={fetcher.state !== 'idle'}
              onClick={fetchMoreArticles}
            >
              {fetcher.state !== 'idle' ? 'Loading...' : 'Load more articles'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
