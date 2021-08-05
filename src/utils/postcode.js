const UK_POSTCODE_REGEX = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/;

export const isValid = (query) => {
	return query && UK_POSTCODE_REGEX.test(query);
};

export const canBeValid = (query) => {
	return !query || query.length < 6 || isValid(query);
};
