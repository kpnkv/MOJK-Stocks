import { useContext, useEffect, useState } from 'react';
import AuthContext from '../Context/AuthProvider'; // Assuming you have an AuthContext for authentication
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Stocks.css'

const Stocks = () => {
  const [stocks, setStocks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { auth } = useContext(AuthContext); // Access auth data from context

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stocks`);
        setStocks(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error.message); 
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleAddStock = async (stock) => {
    try {
      const userId = auth._id; 
      
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${userId}/addStock`, {
        stockSymbol: stock.symbol, 
        stockPrice: stock.lastPrice,
      });

      if (response.status === 200) {
        alert('Stock added to your watchlist!');
      }
    } catch (error) {
      console.error('Error adding stock to watchlist:', error);
      alert('Error adding stock to watchlist');
    }
  };

  if (loading) {
    return <div className="loadingMessage">Loading stocks...</div>;
  }

  if (error) {
    return <div className="errorMessage">Error loading stocks: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="StockList">
        <h2>Potentially Profitable Stocks:</h2>
        {stocks.map((stock, index) => (
          <div key={index} className="stockItem">
            <div className="stockContent">
              <h3 className="stockTitle">{stock.symbol}</h3>
              <p className="StockListText">Last Price: ${stock.lastPrice}</p>
              <p className="StockListText">
                Change: {stock.changePercentage}
              </p>
            </div>
            <button 
              className="addStockButton" 
              onClick={() => handleAddStock(stock)}>
              Add Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stocks;
