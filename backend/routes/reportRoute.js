import express from 'express';
import { report } from '../models/report.js';

const router = express.Router();

// creates report in data base
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.email ||
            !request.body.report_text
        ){
          return response.status(400).send({
            message: 'Send all required fields: email and report text',
          });  
        }
        const newReport = {
            email: request.body.email,
            report_text: request.body.report_text,
        };

        const Ureport = await report.create(newReport);
        return response.status(201).send(Ureport); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

export default router; 