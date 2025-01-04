import { useState, useEffect } from 'react';
import axios from 'axios';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://edu-hub-bangla-server.vercel.app/forum/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Error loading forum posts');
    }
  };

  return (
    <div className="forum-page p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">All Forum Posts</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="p-4 bg-white border rounded shadow">
              <h3 className="text-xl font-semibold">{post.title || 'Untitled Post'}</h3>
              <p className="text-gray-700">{post.content || 'No content provided'}</p>
              <p className="text-sm text-gray-500">
                <strong>{post.createdBy || 'Anonymous'}</strong> -{' '}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
