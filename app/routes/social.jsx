import {useLoaderData, Link} from '@remix-run/react';
import {useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';

export async function loader({context}) {
  const environment = await context.env;

  return environment;
}

export default function Social() {
  const env = useLoaderData();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `https://graph.facebook.com/${env.PUBLIC_FACEBOOK_USER_ID}/feed?fields=message,picture,created_time&access_token=${env.PUBLIC_FACEBOOK_ACCESS_TOKEN}`,
      );
      const data = await response.json();
      setPosts(data.data);
    };
    fetchPosts();
  }, [env.PUBLIC_FACEBOOK_ACCESS_TOKEN, env.PUBLIC_FACEBOOK_USER_ID]);

  return (
    <div>
      <h2>Recent Facebook Posts</h2>
      <ul>
        {/* {posts.map((post) => (
          <li key={post.id}>
            <div>{post.message}</div>
            {post.picture && <Image src={post.picture} alt={post.message} />}
            <div>{post.created_time}</div>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
