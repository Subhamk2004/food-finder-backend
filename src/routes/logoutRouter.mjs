import '../strategies/localStrategy.mjs';
import { Router } from 'express';
import passport from 'passport';

let logoutRouter = Router();
logoutRouter.post("/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401);
  
    req.logout((err) => {
      if (err) return res.sendStatus(400);
      res.status(200).send("User logged out successfully");
    });
    // After using passport.session(), you can access the logout() function on the req object.
    // This method is used to invalidate the user's session.
  });

export default logoutRouter;