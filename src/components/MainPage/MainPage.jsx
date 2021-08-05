import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Typography, Button, TextField, Paper } from "@material-ui/core";

import { Page, Spinner } from "components";
import { isValid, canBeValid } from "utils";
import { useKeypress } from "hooks";
import PostcodeService from "services/postcode";

export const MainPage = () => {
	const history = useHistory();
	const params = useParams();

	const urlQuery = useMemo(
		() => params?.postcode?.replace(/[_-]+/, " ").toUpperCase(),
		[params]
	);

	const [query, setQuery] = useState(urlQuery ?? "");
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const handleInput = (e) => {
		const { value } = e.target;
		if (value.length > 8) return;
		setError(null);
		setQuery(value.toUpperCase());
	};

	// Get suggestions on input
	useEffect(() => {
		if (query)
			PostcodeService.autocomplete(query).then((data) => {
				setOptions(data.result);
			});
	}, [query, options]);

	const submit = useCallback(
		(option) => {
			setLoading(true);
			PostcodeService.lookup(option ?? query).then((data) => {
				setLoading(false);
				if (data.status === 200) {
					setData(data.result);
					history.push("/" + data.result.postcode.replace(" ", "_"));
				} else setError(data.error);
			});
		},
		[query, setData, history]
	);

	const backToHome = () => {
		setData(null);
		history.push("/");
	};

	useKeypress("Enter", () => isValid(query) && submit());

	// Update state on param change
	useEffect(() => {
		if (!urlQuery) return;
		setQuery(urlQuery);
		if (!data || urlQuery !== data.postcode.toUpperCase()) submit();
	}, [urlQuery, data, submit]);

	return (
		<Page
			header={
				<Typography component="h2" variant="h5" align="center">
					{urlQuery ? urlQuery : "Postcode Lookup"}
				</Typography>
			}
			main={
				loading ? (
					<Spinner />
				) : data ? (
					<div>
						{(() => {
							const { country, region } = data;
							return (
								<>
									<Typography>Country: {country}</Typography>
									<Typography>Region: {region}</Typography>
								</>
							);
						})()}
					</div>
				) : (
					<>
						<TextField
							fullWidth
							autoFocus
							variant="outlined"
							error={!!error || !canBeValid(query)}
							label="Postcode"
							value={query || ""}
							onChange={handleInput}
							helperText={error ?? null}
						/>

						{options && options.length > 1 && (
							<Paper>
								{options.map((option) => (
									<Button key={option} onClick={() => submit(option)}>
										{option}
									</Button>
								))}
							</Paper>
						)}
					</>
				)
			}
			footer={
				<Button
					fullWidth
					variant="contained"
					color="primary"
					disabled={!isValid(query)}
					onClick={data ? backToHome : submit}
				>
					{data ? "Go Back" : "Search"}
				</Button>
			}
		/>
	);
};
