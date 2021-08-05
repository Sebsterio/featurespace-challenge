export const getResponseData = (resp) => resp.data;

export const getErrorResponseData = (err) => err.response.data;

export const rethrowError = (err) => {
	throw err;
};
