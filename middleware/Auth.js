const jwt = require('jsonwebtoken');
require('dotenv').config();

const CheckUser = (req, res, next) => {
    const tok = req.headers['authorization'];
    if (!tok) {
        return res.status(401).json({ message: 'Access denied' });
    }
    const token = tok.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.LoginSecret);

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}
module.exports = CheckUser;