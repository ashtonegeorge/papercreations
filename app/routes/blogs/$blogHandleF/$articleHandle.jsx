// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable hydrogen/prefer-image-component */
import {useRef} from 'react';
import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import moment from 'moment';

const seo = ({data}) => ({
  title: data?.article?.title,
  description: data?.article?.authorV2,
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

  const textAreaRef = useRef(null);

  function handleCopy() {
    textAreaRef.current.select();
    document.execCommand('copy');
    console.log('Text copied to clipboard');
  }

  return (
    <>
      <header className="w-full gap-8 py-8 justify-items-start font-open border-b mb-12">
        <h1 className="text-4xl md:text-5xl text-center font-bold font-cormorant pb-4 md:pb-8">
          {article.title}
        </h1>
        <h2 className="text-center py-1 md:py-2">by {article.authorV2.name}</h2>
        <h3 className="text-center py-2 md:py-4">
          Published on {moment(article.publishedAt).format('MMMM Do, YYYY')}
        </h3>

        <img
          src={article.image.url}
          alt={article.title}
          className="mx-auto w-2/5 my-3 border border-neutral-200 shadow-lg rounded-lg"
        />

        <textarea
          className="invisible"
          ref={textAreaRef}
          value={`https://www.facebook.com/papercreationsbystacey`}
          readOnly
        />
        <button className="flex justify-center" onClick={handleCopy}>
          <h2 className="my-auto pr-2">Share this post!</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
            className="fill-neutral-400 hover:fill-sky-400 transition ease duration-400"
          >
            <path d="M220 1016q-24 0-42-18t-18-42V447q0-24 18-42t42-18h169v60H220v509h520V447H569v-60h171q24 0 42 18t18 42v509q0 24-18 42t-42 18H220Zm229-307V252l-88 88-43-43 161-161 161 161-43 43-88-88v457h-60Z" />
          </svg>
        </button>
      </header>
      <main className="w-5/8 mx-auto font-open px-12 pb-12">
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
