import {Router} from 'express';
import Cart from '../mongoose/schemas/CartSchema.mjs'

let router = Router(); 

router.get('/cart', async (req, res) => {
    try {
        let fullCart = await Cart.find();
        res.status(200).send(fullCart);
        console.log(fullCart);
        
    } catch (error) {
        console.log('Error getting users', error);
    }
})

router.post('/cart',
    async (req, res) => {
        console.log('Entered Post');
        let data = req.body;
        let newCart = new Cart(data);
        try {
            let savedCart = await newCart.save();
            console.log('Cart saved to databse');
            return res.status(201).send(savedCart);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: error.message });
        }
    })  

    export default router;