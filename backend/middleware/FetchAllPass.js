const jwt = require('jsonwebtoken');

// Get the user from jwtToken and add user id to request body
const FetchAllPass = async (req, res, next) => {
    try {
        // receving auth token from request header
        const authToken = req.header("authtoken")
        // if there is no auth token in header
        if (!authToken) {
            return res.status(401).send("Invalid User")
        }
        try {
            // extracting user from authToken
            const userFromJwtToken = await jwt.verify(authToken, process.env.JWT_PVT_KEY)
            // sending user with request
            req.user = userFromJwtToken.user
            //  calling the next callback function
            next();
        } catch (error) {
            res.status(401).send("Invalid User")
        }

    } catch (error) {
        console.error({ error: error.message })
    }
}




module.exports = FetchAllPass