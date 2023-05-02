import {useLoaderData, Link} from '@remix-run/react';
import {useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';

export async function loader({context}) {
  const environment = await context.env;

  return environment;
}

export default function Social() {
  window.fbAsyncInit = function () {
    FB.init({
      appId: '{your-app-id}',
      cookie: true,
      xfbml: true,
      version: '{api-version}',
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

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
        {console.log(posts)}
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
