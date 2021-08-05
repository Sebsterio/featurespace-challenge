import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper } from "@material-ui/core";

/*************************************************
 * Container: assummed to be stretched by parent (x & y)
 * Page: Grows vertically to contain children
 * Header & footer: optional
 * Main: Grows vertically to fill free space
 *************************************************/

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		// browser bug fix
		padding: theme.spacing(3, 3, 0, 3),
		"& > *:last-child": { marginBottom: theme.spacing(3) },
	},
	header: {
		padding: theme.spacing(2),
	},
	main: {
		flex: 1,
		display: "grid",
		gridGap: theme.spacing(3),
		alignContent: "center",
		paddingTop: theme.spacing(4),
	},
	spacer: {
		height: theme.spacing(4),
		flex: "0 0 auto",
	},
}));

export const Page = ({
	header,
	footer,
	main,
	children = main,
	maxWidth = "xs",
}) => {
	const c = useStyles();
	return (
		<Container maxWidth={maxWidth} className={c.page}>
			{header && (
				<Paper component="header" className={c.header}>
					{header}
				</Paper>
			)}

			{main && <div className={c.main}>{children}</div>}

			<div className={c.spacer} />

			{footer && footer}
		</Container>
	);
};
