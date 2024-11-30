import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../Context/AuthProvider'; 
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const { auth, setAuth } = useContext(AuthContext); 
  const [userStockList, setUserStockList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserStockList = async () => {
      try {
        if (!auth?._id) {
          console.error('User ID is missing from the auth context.');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${auth._id}`);
        setUserStockList(response.data.stockList);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching user stock list:', error);
        setError('Failed to fetch stock list');
        setLoading(false);
      }
    };

    if (auth?._id) {
      fetchUserStockList();
    }
  }, [auth?._id]);

  const subscriptionStatus = "Free"; 

  const handleUpgrade = () => {
    alert("Upgrade Subscription button clicked!"); 
  };

  const handleLogout = () => {
    try {
      setAuth({
        user: null,
        email: null,
        stockList: [],
        _id: null,
        accessToken: null,
      });
      setUserStockList([]); 
      alert('You have been logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth?._id) {
      alert('No user ID found.');
      return;
    }
  
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
  
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${auth._id}/delete`
      );
      alert(response.data.message);
      setAuth({
        user: null,
        email: null,
        stockList: [],
        _id: null,
        accessToken: null,
      });
      setUserStockList([]); 
    } catch (error) {
      console.error('Error deleting account:', error.response?.data || error.message);
      alert('Failed to delete account.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-text">
              <h1 className="profile-name">{auth?.user}</h1>
              <p className="subscription-status">
                Subscription Status: <span>{subscriptionStatus}</span>
              </p>
              <button className="upgrade-button" onClick={handleUpgrade}>
                Upgrade Subscription
              </button>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
              <button className="delete-account-button" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>My Watchlist</h2>
          <div className="watchlist">
            {userStockList.length > 0 ? (
              userStockList.map((stock, index) => (
                <div key={index} className="stock-card">
                  <strong>{stock.symbol}</strong> - ${stock.price}
                </div>
              ))
            ) : (
              <p>No stocks in your watchlist.</p>
            )}
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
  );
};

export default Profile;
