const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\model.js");
const keys = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\config\\key.js");
const opts = {};                                         
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

