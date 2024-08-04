import { Router } from 'express';
import FoodItem from '../mongoose/schemas/foodItemSchema.mjs'

let router = Router();

router.get('/fooditems', async(req, res) => {
    try {
        const foodItems = await FoodItem.find(); 
        res.status(200).json(foodItems);
    } catch (error) {
        console.error('Failed to fetch food items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router;