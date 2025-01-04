import React, { useEffect } from 'react';
import BestServiceSlider from '../../Components/BestServiceSlider';
import PopularServices from '../../Components/PopularServices';
import ForumSection from '../../Components/ForumSection';
import ArticlesSection from '../../Components/ArticlesSection';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Make sure AOS styles are imported

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS when the page loads
  }, []);

  return (
    <div>
      <div data-aos="fade-up">
        <BestServiceSlider />
      </div>

      <div data-aos="fade-up">
        <PopularServices />
      </div>

      <div data-aos="fade-up">
        <ForumSection />
      </div>

      <div data-aos="fade-up">
        <ArticlesSection />
      </div>
    </div>
  );
};

export default Home;
