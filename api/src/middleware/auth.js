const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  
  var token = req.headers.authorization

  //Check if not taken
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied'})
    return
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret)

    req.user = decoded.user
    next()
    // return
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid'})
    console.error(err)
  }
}