import { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize AOS when component mounts
    AOS.init({ duration: 1000, once: true });

    // Fetch articles
    axios.get('https://edu-hub-bangla-server.vercel.app/articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        setError('Error loading articles');
      });
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8" data-aos="fade-up">Expert Articles & Tips</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* 3-column grid for articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
              <h3 className="text-2xl font-semibold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.content}</p>
              <p className="text-gray-500 text-sm mt-4">
                <strong>{article.author}</strong> - {new Date(article.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
