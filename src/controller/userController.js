import passport from 'passport';

const passportOptions = { badRequestMessage: 'falta username / password' };

export const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if(err) {
            return next(err)
        }
        if(!user) return res.status(401).json(info);
        res.json({msg: 'signup OK'})
    })(req, res, next);
}

export const login = (req, res) => {
    res.cookie("password", req.body.password)
    res.cookie("username", req.body.username).redirect("/")
    
}

export const getHome = (req, res) => {
    res.json(req.session)
}  