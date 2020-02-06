module.exports.successResponse = function (res, msg) {
	return res.status(200).json({
		status: 1,
		message: msg,
	})
}

// apiResponse.successResponseWithData(res, "Operation success", []);
module.exports.successResponseWithData = function (res, msg, data) {
	return res.status(200).json({
		status: 1,
		message: msg,
		data: data
	});
};

// apiResponse.errorResponse(res, "Operation invalid");
module.exports.errorResponse = function (res, msg) {
	return res.status(200).json({
		status: 0,
		message: msg,
	})
};

