import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth Context/AuthProvider'; // Corrected import path
import { Link } from 'react-router-dom'; // For routing
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const ForumSection = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from the AuthContext
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch posts on initial load
  useEffect(() => {
    fetchPosts();
    AOS.init({ duration: 1000, once: true }); // Initialize AOS animations when the component mounts
  }, []);

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://edu-hub-bangla-server.vercel.app/forum/posts');
      setPosts(response.data); // Store posts in state
    } catch (err) {
      setError('Error loading forum posts');
    }
  };

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.displayName) {
      setError('You need to be logged in to post.');
      setLoading(false);
      return;
    }

    const postData = {
      title: newPost.title,
      content: newPost.content,
      createdBy: user.displayName, // Set createdBy to the logged-in user's displayName
      createdAt: new Date().toISOString(), // Use a valid ISO date format for createdAt
    };

    try {
      // Send new post data to the server
      const response = await axios.post(
        'https://edu-hub-bangla-server.vercel.app/forum/posts',
        postData,
        { withCredentials: true }
      );

      // Ensure the new post is added to the posts list immediately after posting
      const newPostData = {
        ...postData,
        createdAt: new Date().toISOString(),
      };

      // Prepend new post to the existing posts array in the state
      setPosts([newPostData, ...posts]);

      // Reset form
      setNewPost({ title: '', content: '' });
      setError('');
    } catch (err) {
      setError('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  // Get only the first 3 posts
  const displayedPosts = posts.slice(0, 3);

  return (
    <div className="forum-section p-6 bg-gray-100 my-5">
      <h2 className="text-2xl font-bold mb-4 text-black" data-aos="fade-up">
        Community Forum
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6" data-aos="fade-up">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="btn btn-primary text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>

      {/* Render the first 3 posts */}
      <div className="space-y-4" data-aos="fade-up">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <div key={index} className="p-4 bg-white border rounded shadow">
              <h3 className="text-xl font-semibold">{post.title || 'Untitled Post'}</h3>
              <p className="text-gray-700">{post.content || 'No content provided'}</p>
              <p className="text-sm text-gray-500">
                <strong>{post.createdBy || 'Anonymous'}</strong> -{' '}
                {new Date(post.createdAt).toLocaleString() !== 'Invalid Date'
                  ? new Date(post.createdAt).toLocaleString()
                  : 'Invalid Date'}
              </p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {/* "See all forum posts" button */}
      {posts.length > 3 && (
        <div className="mt-4 text-center" data-aos="fade-up">
          <Link to="/forum" className="btn btn-primary text-white px-4 py-2 rounded">
            See all forum posts
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForumSection;
