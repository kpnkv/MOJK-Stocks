import express from "express";
import cors from 'cors'; 
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'; 
import reportRoute from './routes/reportRoute.js'; 
import contactRoute from './routes/contactRoute.js';
import * as dotenv from "dotenv"


dotenv.config();

const app = express();

// parses requests body
app.use(express.json());

// middleware for handling cors policy
app.use(cors()); 

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Server is working');
});

app.use('/user', userRoute); 
app.use('/report', reportRoute);
app.use("/contact", contactRoute);

mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log('App is connected to database')
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });