import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error('Element with id "root" not found');
}
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
