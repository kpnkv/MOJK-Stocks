import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchStocksStyles.css';

const SearchStocks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch stocks data
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stocks`);
                // Make sure we're handling the data structure correctly
                if (response.data && Array.isArray(response.data)) {
                    setStocks(response.data);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching stocks:', err);
                setError('Failed to fetch stocks');
                setLoading(false);
            }
        };

        fetchStocks();
        // Add interval to keep data fresh
        const interval = setInterval(fetchStocks, 300000); // Update every 5 mins
        return () => clearInterval(interval);
    }, []);

    // Filter stocks based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredStocks([]);
            return;
        }

        try {
            const filtered = stocks.filter(stock => 
                stock.symbol && stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStocks(filtered);
        } catch (err) {
            console.error('Error filtering stocks:', err);
            setError('Error filtering stocks');
        }
    }, [searchTerm, stocks]);

    return (
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
      
            {searchTerm && (
                <div className="search-dropdown">
                    {loading ? (
                        <div className="message loading">Loading...</div>
                    ) : error ? (
                        <div className="message error">{error}</div>
                    ) : filteredStocks.length === 0 ? (
                        <div className="message no-results">No stocks found</div>
                    ) : (
                        filteredStocks.map((stock, index) => (
                            <Link to='/Stocks' key={index}>
                                <div  className="stock-result">
                                    <div className="stock-symbol">{stock.symbol}</div>
                                    <div className="stock-details">
                                        Last Price: ${stock.lastPrice}
                                        <span className={`stock-change ${
                                            parseFloat(stock.changePercentage) > 0 ? 'positive' : 'negative'
                                        }`}>
                                            {stock.changePercentage}
                                        </span>
                                    </div>
                                    </div>
                                </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchStocks;