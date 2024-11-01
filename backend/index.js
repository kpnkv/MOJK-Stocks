import express from "express";
import cors from 'cors'; 

const app = express();

// parses requests body
app.use(express.json());

// middleware for handling cors policy
app.use(cors()); 

app.get('/', (request, response) =>{
    console.log(request)
    return response.status(234).send('Server is working');
});

app.listen(8080, () => {
    console.log("Server is started on port");
})