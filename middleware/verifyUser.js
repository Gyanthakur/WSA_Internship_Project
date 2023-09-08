const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
  const { token: accessToken } = req.body;

  if (!accessToken) {
    return res.status(401).json({
      status: 'fail',
      message: 'Authorization failed, Please login!',
    });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid token!',
      });
    }
    req.body.id = userData.id;
    next();
  });
};

module.exports = verifyUser;
