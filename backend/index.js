import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';
import * as dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import SignUp from './routes/SignUp.js';
import authRoutes from './routes/authRoutes.js';
import contactRoute from './routes/contactRoute.js';
import logout from './routes/logout.js';
import reportRoute from './routes/reportRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const app = express();

// parses requests body
app.use(express.json());


// Middleware for handling CORS policy
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`, // Allow requests only from this origin
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions)); // Use the specified CORS options

app.use(express.urlencoded({extended: false}));


app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Server is working');
});

app.use('/user', userRoute);
app.use('/report', reportRoute);
app.use("/contact", contactRoute);
app.use("/SignUp" , SignUp);
app.use("/auth" , authRoutes);
app.use("/logout", logout);

let cachedStocks = null;
let lastFetchTime = null;
const oneHour = 60 * 60 * 1000; 

app.get('/stocks', (request, response) => {
  const currentTime = Date.now();
  
  
  if (cachedStocks && currentTime - lastFetchTime < oneHour) {
    console.log("Returning cached data...");
    return response.json(cachedStocks); 
  }

  axios.get('https://finance.yahoo.com/lookup/')
    .then((res) => {
      const $ = cheerio.load(res.data);

      const stocks = []; 

      $('tbody.body.yf-paf8n5 tr').each((i, element) => {
        const symbol = $(element).find('a.loud-link.fin-size-medium.yf-1e4diqp').text().trim();
        const lastPriceText = $(element).find('td').eq(2).text().trim();
        const lastPrice = lastPriceText.split(' ')[0]; 

        const changeText = $(element).find('fin-streamer[data-test="colorChange"] span').text().trim();
        const changePercentageMatch = changeText.match(/[+-]?\d+(\.\d+)?%/);

        if (symbol && lastPrice && changePercentageMatch) {
          const changePercentage = changePercentageMatch[0];

          if (parseFloat(changePercentage) > 0) {
            stocks.push({
              symbol,
              lastPrice,
              changePercentage,
            });
          }
        }
      });

      cachedStocks = stocks;
      lastFetchTime = currentTime;

      response.json(stocks);
    })
    .catch((err) => {
      console.error('Error:', err);
      response.status(500).json({ error: 'Failed to fetch data' });
    });
});

mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log('App is connected to database')
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });