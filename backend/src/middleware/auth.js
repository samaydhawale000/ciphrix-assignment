const jsonWebToken = require("jsonwebtoken");

const userAuthentication = async (request, response, next) => {
    try {
        // ------Authorization header ----
        const authHeader = request?.header("authorization");
        if (authHeader) {
            const token = authHeader.split(" ")[1];

            // --------Verify the JWT token ------
            jsonWebToken?.verify(token, process.env.JWT_SECRET_KEY, async (error, userDetails) => {
                if (error) {
                    return response.status(400).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended, Please login again."
                    });
                } else {
                    request._id = userDetails?._id;
                    request.name = userDetails?.name;
                    request.mobile = userDetails?.mobile;
                    request.userType = userDetails?.userType;
                }
                next();
            })
        } else {
            return response.status(400).json({
                status: "JWT_INVALID",
                message: "Your session has ended, Please login again."
            });
        }
    } catch (error) {
        return response.status(400).json({
            status: "FAILED",
            message: error.message
        })
    }
}

module.exports = userAuthentication;