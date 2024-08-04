import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let loginRouter = Router();

loginRouter.post('/loginuser', passport.authenticate("local"), (req, res) => {
    console.log('Entered login endpoint');

    console.log(req.session.passport.user);
    req.session.isAuthenticated = true;
    req.session.email = req.user.email;
    console.log(req.session);


    req.session.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not save session' });
        }
        res.json({ user: req.user });
    });
})

loginRouter.get('/loginuser/status', (req, res) => {
    console.log('inside login status');
    console.log(req.user);
    console.log(req.cookies);
    console.log(req.session);


    if (req.user) {
        let data = req.user.email;
        console.log("req.user.email is ", data);

        return res.json({ email: data });

    }
    return res.status(404).send({ message: "User already logged out" });
})

export default loginRouter;