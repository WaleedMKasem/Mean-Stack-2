
// Create a new error handling controller method
exports.getErrorMessage = function(err) {
    if (err.errors) {
        for (const errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    }
    else {
        return `Unknown server error:${err}`;
    }
};
exports.sendError = function(err,res) {
	return res.status(400).json(err);
};

