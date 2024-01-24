/**
 * Unsupported (404) routes
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function notFound(req, res, next) {
    const error = new Error(`${req.originalUrl} Not Found`);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    const statusCode = res.statusCode!== 200? res.statusCode : 500;
    res.status(statusCode).json({
        message: error.message || "An unknown error occurred",
        stack: process.env.NODE_ENV === 'production'? 'An unknown error occurred' : error.stack,
    });
}

module.exports = {notFound, errorHandler};

