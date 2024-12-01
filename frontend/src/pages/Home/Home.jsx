import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SearchStocks from '../../components/SearchStocks/SearchStocks';
import './Home.css';
import logo from './logo.png';
import stockImage from './StockImage.png';

const Home = () => {
  const [stockData, setStockData] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  // Get top 3 performers
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${VITE_REACT_APP_BACKEND_BASEURL}/stocks`);
        // Sort stocks by changePercentage
        const sortedStocks = response.data.sort((a, b) => {
          const aChange = parseFloat(a.changePercentage.replace('%', ''));
          const bChange = parseFloat(b.changePercentage.replace('%', ''));
          return bChange - aChange; // Sort in descending order
        });
        
        const topStocks = sortedStocks.slice(0, 3).map(stock => ({
          name: stock.symbol,
          price: stock.lastPrice,
          change: stock.changePercentage,
          category: determineCategory(stock.changePercentage)
        }));
        setStockData(topStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 300000); // Update every 5 mins
    return () => clearInterval(interval);
  }, []);

  const determineCategory = (changePercentage) => {
    const change = parseFloat(changePercentage);
    if (change > 5) return 'Top Performer';
    if (change > 3) return 'Strong Buy';
    return 'Recommended';
  };

  // Email Newsletter
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_REACT_APP_BACKEND_BASEURL}/newsletter/newsletter`, {
        email: newsletterEmail,
        subscriptionType: 'newsletter'
      });
      setSubscriptionMessage('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);
      setSubscriptionMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to MOJK Stocks</h1>
          <p className="hero-subtitle">Empower your financial journey with us</p>
          <div className="search-container">
            <SearchStocks />
          </div>
            <Link to="/stocks">
            <button className="primary-button">Get Started</button>
            </Link>
        </div>
          <div className="logo-container">
            <img id="logo" src={logo} alt="MOJK Stocks logo" />
          </div>
        </section>

        {/* Featured Stocks Section */}
        <section className="stocks-section">
          <h2 className="section-title">Featured Stocks</h2>
          <p className="section-subtitle">Today's Top Performers</p>
          <div className="stocks-header">
            <Link to="/stocks">
              <button className="primary-button">View All</button>
            </Link>
          </div>

          <div className="stocks-grid">
            {stockData.map((stock, index) => (
              <div key={index} className="stock-card">
                <Link to="/stocks">
                  <div className="stock-image">
                    <img src={stockImage} alt={`${stock.name} stock chart`} />
                  </div>
                </Link>
                <div className="stock-info">
                  <div className="stock-category">{stock.category}</div>
                  <div className="stock-name">{stock.name}</div>
                  <div className="stock-price">
                    Price: ${stock.price} | Change: {stock.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <h2 className="section-title">Subscribe to Newsletter</h2>
          <p className="section-subtitle">Get the latest updates directly to your inbox</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="email-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="primary-button">Subscribe</button>
          </form>
          {subscriptionMessage && (
            <p className="subscription-message">{subscriptionMessage}</p>
          )}
          <p className="privacy-notice">We respect your privacy</p>
        </section>
      </div>
    </div>
  );
};

export default Home;