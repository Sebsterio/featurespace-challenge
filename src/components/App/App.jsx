import React from "react";
import { Switch, Route } from "react-router-dom";

import { MainPage } from "components";

import { useStyles } from "./App.styles";

const NotFoundPage = () => {
	return <div>Page Not Found</div>;
};

export default NotFoundPage;

export function App() {
	const c = useStyles();

	return (
		<div className={c.app}>
			<main className={c.main}>
				<Switch>
					<Route path="/:postcode">
						<MainPage />
					</Route>
					<Route path="/">
						<MainPage />
					</Route>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</main>
		</div>
	);
}
