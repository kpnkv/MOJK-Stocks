import express from 'express';
import { User } from '../models/user.js';

const router = express.Router();

// creates user in data base
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.email ||
            !request.body.password ||
            !request.body.username
        ){
          return response.status(400).send({
            message: 'Send all required fields: email, password, username',
          });  
        }
        const newUser = {
            email: request.body.email,
            username: request.body.username,
            password: request.body.password,
        };

        const createdUser = await User.create(newUser);
        return response.status(201).send(createdUser); 
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
} );

// deleting a user
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const result = await User.findByIdAndDelete(id);
        if(!result){
            response.status(404).json({ message: 'user not found'});
        }
        return response.status(200).send({ message: 'user deleted successfully' })
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
}); 

router.post('/:userId/addStock', async (request, response) => {
    try {
      const { userId } = request.params;
      const { stockSymbol, stockPrice } = request.body;
  
      console.log('Adding stock:', stockSymbol, stockPrice); // Log the incoming request body
  
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
      
      const newStock = { symbol: stockSymbol, price: stockPrice }
      user.stockList.push(newStock);
      await user.save();
  
      console.log('Stock added successfully:', user.stockList); // Log successful addition
  
      return response.status(200).json({
        message: 'Stock added to watchlist',
        stockList: user.stockList
      });
    } catch (error) {
      console.error('Error adding stock to watchlist:', error); // Log the error
      return response.status(500).send({ message: error.message });
    }
  });
  

  // Example backend route to fetch user details, including the stock list
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ stockList: user.stockList });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'Error fetching user data' });
    }
  });
  
export default router; 