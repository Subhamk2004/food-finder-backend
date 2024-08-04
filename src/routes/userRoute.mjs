import {Router} from 'express';
import {User} from '../mongoose/schemas/UserSchema.mjs'
import { checkSchema, validationResult, matchedData } from "express-validator";
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { hashPassword } from '../utils/passwordEncryptor.mjs';

let router = Router(); 


router.get('/registeruser', async (req, res) => {
    try {
        let allUsers = await User.find();
        res.status(200).send(allUsers);
        console.log(allUsers);
        
    } catch (error) {
        console.log('Error getting users', error);
    }
})

router.post('/registeruser',
    checkSchema(createUserValidationSchema),
    async (req, res) => {
        console.log('Entered Post');
        
        let errors = validationResult(req);
        console.log(errors); 
        if (!errors.isEmpty()) {
            return res.status(400).send(`Enter correct data`);  
        }
        let validatedData = matchedData(req);
        validatedData.password = hashPassword(validatedData.password);

        let newUser = new User(validatedData);
        try {
            let savedUser = await newUser.save();
            console.log('User saved to databse');
            return res.status(201).send(savedUser);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: error.message });
        }
    })  

    export default router;