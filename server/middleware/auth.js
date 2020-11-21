const { User } = require('../models/User');
const { Couple } = require('../models/Couple');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });
    req.token = token;
    req.user = user;
    if (req.user.isCouple) {
      Couple.findOne({ person1: req.user._id },
        (err, result) => {
          if (err)
            throw err
          if (!result) {
            Couple.findOne({ person2: req.user._id },
              (err, result2) => {
                if (err)
                  throw err
                req.user.coupleId = result2._id
              })
          } else {
            req.user.coupleId = result._id
          }
        })
    }
    next();
  });
};

module.exports = { auth };
