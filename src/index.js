import React from 'react';
import ReactDom from 'react-dom';

import "./css/style.css";

import App from './components/App';

import drizzle from "./drizzle";

import {DrizzleContext} from "drizzle-react";

ReactDom.render(<DrizzleContext.Provider drizzle={drizzle}>
	<App />
	</DrizzleContext.Provider>,
	 document.getElementById("root")
);