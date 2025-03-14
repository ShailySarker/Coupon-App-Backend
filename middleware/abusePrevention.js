const trackUser = (req, res, next) => {
    const ipAddress = req.ip || req.connection.remoteAddress;
    req.ipAddress = ipAddress;
    next();
};

module.exports = { trackUser };