import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import ArticleGrid from '../../components/ArticleGrid';

const seo = ({data}) => ({
  title: data?.article?.title,
  description: data?.article?.excerpt,
});

export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const blogHandle = params.blogHandle;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {blog} = await context.storefront.query(BLOG_QUERY, {
    variables: {
      blogHandle,
      cursor,
    },
  });

  // Handle 404s
  if (!blog) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    blog,
  });
}

export const meta = ({data}) => {
  return {
    title: data?.blog?.title ?? 'Article',
    description: data?.blog?.authors.name,
  };
};

export default function Blog() {
  const {blog} = useLoaderData();
  return (
    <main className="px-12 pb-12">
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block justify-self-center">
          {blog.title}
        </h1>
      </header>
      <ArticleGrid blog={blog} url={`/blogs/${blog.handle}`} />
    </main>
  );
}

const BLOG_QUERY = `#graphql
  query BlogArticles($blogHandle: String!, $cursor: String) {
  blog(handle: $blogHandle) {
    title
    id
    authors {
      name
    }
    articles(first: 6, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
        id
        publishedAt
        excerpt
        title
        handle
        authorV2 {
          name
        }
        image {
          url
        }
        blog {
          handle
        }
      }
    }
  }
}
`;
