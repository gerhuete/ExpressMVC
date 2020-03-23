const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.session.token;
        const decoded = jwt.verify(token, global.config.secretKey);
        req.body.name = decoded.name;
        next();
    } catch (error) {
        res.render('users/signin');
    }
};