import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import logo from './logo.png';

const Home = () => {
  const stockData = [
    { name: 'Tech Giant Inc.', price: '100', change: '+2', category: 'Recommended' },
    { name: 'Energy Innovations Corp', price: '75', change: '-1', category: 'Top Performer' },
    { name: 'Biotech Solutions Ltd.', price: '120', change: '+5', category: 'New Entry' }
  ];

  return (
    <div>
      <Navbar />
      <div className="home-container">
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to MOJK Stocks</h1>
            <p className="hero-subtitle">Empower your financial journey with us</p>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search stocks..."
                className="search-input"
              />
            </div>
            <Link to="/stocks">
              <button className="primary-button">Get Started</button>
            </Link>
          </div>
          <div className="logo-container">
            <img id="logo" src={logo} alt="MOJK Stocks logo" />
        </div>
      </section>

      {/* News */}
      <section className="news-section">
        <div className="news-highlight">
          <h2 className="section-title">Latest News</h2>
          <p className="section-subtitle">Stay updated with the latest stock market trends. The button below takes you to yahoo finance where you can find tons of additional resources for your stock research.</p>
          <p className="section-subtitle">They have some fantastic articles that update daily for any stock news you may need that is not provided here.</p>
          <a href="https://finance.yahoo.com/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAADTUGKOMza6WoUurFLMxqhJGjg4kB76PkjCqQdrT7tNuuU5ADVPqJtmJJj2K6r_0xsbnr3weuFdchmep1HeCXEgoz99YFWmxZHQOtvEUdbkYpXQwsbUyhwVX7FPcMF-SSkoSBNRn4vdwsujUGJmKU39FvW5QVg2Dd--7_KNzvGJS"
          target="_blank" rel="noopener noreferrer">
            <button className="primary-button">Read More</button>
          </a>
        </div>

        <div className="news-grid">
          <div className="news-card">
            <h3 className="card-title">Stock Market Update</h3>
            <ul>
              <li><p className="card-text">Moderna's stock has dropped 71% in the last 6 months</p></li>
              <li><p className="card-text">Google's parent compant, Alphabet, stock drops 5% after the Federal Government pushes them to sell Chrome</p></li>
              <li><p className="card-text">In october, the housing market has finally bounced back and is reaching unprecedented levels in recent years</p></li>
            </ul>
          </div>
          <div className="news-card">
            <h3 className="card-title">Investment Tips</h3>
            <p className="card-text">
              <ul>
                <li>Diversify your Portfolio: A broad portfolio is less likely to lose big</li>
                <li>Start Early: The earlier you begin investing, the better</li>
                <li>Understand the Risks: Realize you may lose money trading, but you may build substantial amounts of wealth</li>
                <li>Make Educated Decisions: Make sure you have enough information to confidently invest</li>
              </ul>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stocks */}
      <section className="stocks-section">
        <h2 className="section-title">Featured Stocks</h2>
        <p className="section-subtitle">Explore our top recommended stocks</p>
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
                <span className="image-placeholder">Stock Image</span>
              </div>
              </Link>
              <div className="stock-info">
                <div className="stock-category">{stock.category}</div>
                <div className="stock-name">{stock.name}</div>
                <div className="stock-price">
                  Price: ${stock.price} | Change: {stock.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <h2 className="section-title">Subscribe to Newsletter</h2>
        <p className="section-subtitle">Get the latest updates directly to your inbox</p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="email-input"
          />
          <button className="primary-button">Subscribe</button>
        </div>
        <p className="privacy-notice">We respect your privacy</p>
      </section>
    </div>
      </div>
  );
};

export default Home;