import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let loginRouter = Router();

loginRouter.post('/loginuser', passport.authenticate("local"), (req, res) => {
    console.log('Entered login endpoint');
    
    console.log(req.session.passport.user);
    
    return res.status(200).send(req.user);
})

loginRouter.get('/loginuser/status', (req, res) => {
    console.log('inside login status');
    

    if (req.user) {
        let data = req.user.email;
        return res.json({email:data});
    }
    return res.status(404).send({message:"User already logged out"});
})

export default loginRouter;