export const globalErrorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
//# sourceMappingURL=error.middleware.js.map