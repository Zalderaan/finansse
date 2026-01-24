"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jwt_1 = require("./jwt");
function authenticateToken(req, res, next) {
    var _a;
    try {
        // get from auth headers first
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // split space bar (Bearer <token>)
        // console.log('token in middleware: ', token)
        // console.log('cookies: ', req.cookies);
        if (!token) {
            console.log("No token from cookies!");
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }
        // console.log('token in middleware: ', token);
        // verify token
        const verified = jwt_1.jwtUtil.verifyToken(token);
        req.user = verified;
        next();
    }
    catch (error) {
        console.error('Token verification error: ', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map