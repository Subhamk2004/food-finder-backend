import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let loginRouter = Router();

loginRouter.post('/loginuser', passport.authenticate("local"), (req, res) => {
    console.log('Entered login endpoint');

    console.log(req.session.passport.user);

    return res.status(200).send(req.user.email);
})

loginRouter.get('/loginuser/status', (req, res) => {
    console.log('inside login status');
    console.log(req.user);


    // if(req.session) {
    //     console.log(req.session);
    // }
    // if(req.session.passport) {
    //     console.log(req.session.passport);
    // }
    // if(req.session.passport.user) {
    //     console.log(req.session.passport.user);  
    // }




    if (req.session.passport.user) {
        let data = req.session.passport.user;
        console.log("req.session.passport.user is ",data);

        return res.json({ email: data });

    }
    return res.status(404).send({ message: "User already logged out" });
})

export default loginRouter;