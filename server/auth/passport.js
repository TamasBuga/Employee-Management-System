
require('dotenv').config();

const passportJWT = require('passport-jwt');
const ExrtactJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;
const Admin = require('../models/Admin');



module.exports = (passport) => passport.use(
    new StrategyJWT({
        jwtFromRequest: ExrtactJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_SECRET,
    },
        async (payload, done) => {
            console.log(payload);
            if (payload.expiration < Date.now()) {
                return done('Unauthorized', false)
            }
            return await Admin.findById(payload._id)
                .then((admin) => {
                    return done(null, admin)
                }).catch((err) => {
                    return done(err);
                })
        }
    )
);