import { Router } from "express"
import passport from "passport";
import { signUp, login, getHome } from '../controller/userController.js';

const rutaUsuarios = Router();

const passportOptions = { badRequestMessage: "Falta username / password"}

const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()) return res.status(401).json({msg: 'Unauthorized'});
    next();
}

rutaUsuarios.post('/signup', signUp)

rutaUsuarios.post('/login', passport.authenticate('login', passportOptions), login);

rutaUsuarios.get('/home', isLoggedIn, getHome )

export default rutaUsuarios;