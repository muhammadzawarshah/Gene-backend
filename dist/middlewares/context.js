export const userContext = (req, res, next) => {
    req.body.context = {
        userId: req.headers['x-user-id'] || 'system',
        timestamp: new Date()
    };
    next();
};
//# sourceMappingURL=context.js.map