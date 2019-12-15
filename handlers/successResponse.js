exports.successResponse = function(res, msg) {
    return res.status(200).json({
        status: 1,
        message: msg,
    })
}

// apiResponse.successResponseWithData(res, "Operation success", []);
exports.successResponseWithData = function (res, msg, data) {
	return res.status(200).json({
		status: 1,
		message: msg,
		data: data
	});
};
