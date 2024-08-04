import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let loginRouter = Router();

loginRouter.post('/loginuser', passport.authenticate("local"), (req, res) => {
    console.log('Entered login endpoint');
    console.log(req.user);
    req.login(req.user, (err) => {
        if (err) {
            return res.status(500).json({ message: "Session error" });
        }
        return res.status(200).json(req.user);
    });
})

loginRouter.get('/loginuser/status', (req, res) => {
    console.log('inside login status');


    if (req.user) {
        let data = req.user.email;
        return res.json({ email: data });

    }
    return res.status(404).send({ message: "User already logged out" });
})

export default loginRouter;