// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import moment from 'moment';

const seo = ({data}) => ({
  title: data?.article?.title,
  description: data?.article?.description,
});

export const handle = {
  seo,
};

export async function loader({params, context}) {
  const blogHandleF = params.blogHandleF;
  const articleHandle = params.articleHandle;

  const response = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandleF,
      articleHandle,
    },
  });

  // Handle 404s
  if (!response) {
    throw new Response(null, {status: 404});
  }

  return json({
    response,
  });
}

export const meta = ({data}) => {
  return {
    title: data?.article?.title ?? 'article',
    description: data?.article?.description,
  };
};

export default function Article() {
  const {response} = useLoaderData();
  const article = response.blog.articleByHandle;

  return (
    <>
      <header className="w-full gap-8 py-8 justify-items-start font-open border-b mb-12">
        <h1 className="text-5xl text-center font-bold font-cormorant pb-8">
          {article.title}
        </h1>
        <h2 className="text-center py-2">by {article.authorV2.name}</h2>
        <h3 className="text-center py-4">
          Published on {moment(article.publishedAt).format('MMMM Do, YYYY')}
        </h3>

        <img
          src={article.image.url}
          alt={article.title}
          className="mx-auto w-2/5 my-3 border border-stone-500"
        />
      </header>
      <main className="w-5/8 mx-auto font-open">
        <p>{article.excerpt}</p>
        <p>{article.content}</p>
      </main>
    </>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails($blogHandleF: String!, $articleHandle: String!) {
    blog(handle: $blogHandleF) {
        title
        articleByHandle(handle: $articleHandle) {
          title
          id
          handle
          content
          publishedAt
          image {
            url
          }
          authorV2 {
            name
          }
        }
    }
  }
`;
