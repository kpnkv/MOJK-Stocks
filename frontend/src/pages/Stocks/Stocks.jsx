import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Stocks.css'

const Stocks = () => {
  const [stocks, setStocks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/stocks');
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

  const handleAddStock = (stock) => {
    alert(`Added ${stock.symbol} to your watchlist!`);
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
