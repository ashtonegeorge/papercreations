// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useFetcher, Link} from '@remix-run/react';
import {useEffect, useState} from 'react';
import moment from 'moment';

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
      <section>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blogs/${article.blog.handle}/${article.handle}`}
            >
              <div
                className="grid sm:w-42 w-64 rounded-lg shadow aspect-square bg-no-repeat bg-cover h-full mx-auto"
                style={{
                  backgroundImage: `url(${article.image.url})`,
                }}
              >
                <div className="bg-palette-tea sm:w-42 w-64 bg-opacity-80 rounded-b-lg block mt-auto">
                  <div className="flex justify-center self-end">
                    <h5 className="font-bold sm:w-42 w-64 text-md text-center self-center font-open truncate px-2">
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
            </Link>
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
      </section>
    </>
  );
}
