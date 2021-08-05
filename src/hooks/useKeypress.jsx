import { useEffect } from "react";

export const useKeypress = (key, callback) => {
	useEffect(() => {
		const handleKeypress = (e) => e.key === key && callback();

		document.addEventListener("keydown", handleKeypress);

		return () => document.removeEventListener("keydown", handleKeypress);
	}, [key, callback]);
};
