import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/ImageCarousel';
import '../../styles/HomePage.css';

function HomePage() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const fullText = "Plan your perfect trip with AI-powered recommendations";
  const period = 3000;

  const tick = useCallback(() => {
    if (isDeleting) {
      setText('');
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(50);
    } else {
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(50);
    }

    if (!isDeleting && text === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    }
  }, [isDeleting, text, fullText, period, loopNum]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => {
      clearInterval(ticker);
    };
  }, [text, isDeleting, typingSpeed, tick]);

  return (
    <div className="home-page">
      <div className="home-wrapper">
        <ImageCarousel />
        <div className="home-container">
          <h1>Welcome to Travel Planner</h1>
          <p className="subtitle">
            {text}
            <span className="cursor">|</span>
          </p>
          <Link to="/form" className="cta-button">
            Start Planning Your Trip →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
