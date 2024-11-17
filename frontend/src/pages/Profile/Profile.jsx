import Navbar from '../../components/Navbar/Navbar';
import "./profile.css";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-text">
              <h1 className="profile-name">John Doe</h1>
              <p className="subscription-status">Subscription Status: Active</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>My Watchlist</h2>
          <div className="watchlist">
            <div className="stock-card">AAPL - $210.00</div>
            <div className="stock-card">AMZN - $142.10</div>
            <div className="stock-card">TSLA - $310.20</div>
            <div className="stock-card">MSFT - $400.99</div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Recent News</h2>
          <div className="news-list">
            <div className="news-item">
              <strong>Apple:</strong> Record profits reported for Q3.
            </div>
            <div className="news-item">
              <strong>Amazon:</strong> Announces new AI-powered product line.
            </div>
            <div className="news-item">
              <strong>Tesla:</strong> Robo Taxis Unveiled.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile