const generateToken = (user,exp) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.LoginSecret, { expiresIn: exp || '1h'});
}


module.exports = generateToken;