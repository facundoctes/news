import React from "react"
import NewsGrid from "./components/NewsGrid/NewsGrid"
import { ApiServiceContextProvider } from './ApiServiceContext/ApiServiceContext'

import "./App.css"


function App() {
	return (
		<>
			<ApiServiceContextProvider>
				<header>
					<h2>News Search</h2>
				</header>
				<NewsGrid />
			</ApiServiceContextProvider>
		</>
	)
}

export default App
