const customError = (statusCode, message = "Something went wrong!", errorDetails) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.error = errorDetails;
    return error;
};

export default customError;