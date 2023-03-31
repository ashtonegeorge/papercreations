import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description,
});

export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {article} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!article) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    article,
  });
}

export const meta = ({data}) => {
  return {
    title: data?.collection?.title ?? 'Collection',
    description: data?.collection?.description,
  };
};

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails($id: String!) {
    articles(id: $id) {
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