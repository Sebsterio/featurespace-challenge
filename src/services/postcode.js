import axios from "axios";

import { getResponseData, getErrorResponseData } from "utils";

export class PostcodeService {
	constructor() {
		this._client = axios.create({
			baseURL: "https://api.postcodes.io",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	}

	lookup(query) {
		return this._client
			.get(`/postcodes/${query}`)
			.then(getResponseData)
			.catch(getErrorResponseData);
	}

	autocomplete(query) {
		return this._client
			.get(`/postcodes/${query}/autocomplete`)
			.then(getResponseData)
			.catch(getErrorResponseData);
	}
}

export default new PostcodeService();
