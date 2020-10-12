const jwt = require('jsonwebtoken'),

    ensureToken = function (req, res, next) {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            req.token = bearer[1];
            jwt.verify(req.token, 'my-secret-token', (err, data) => {
                if (err) {
                    return res.status(403).json({
                        result: err.toString()
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(403).json({
                result: "undefined"
            })
        }

    };

module.exports = {
    ensureToken

};
