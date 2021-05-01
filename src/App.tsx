import React from "react"
import NewsContainer from "./components/NewsContainer/NewsContainer"
import { ApiServiceContextProvider } from './ApiServiceContext/ApiServiceContext'

import "./App.css"


function App() {
	return (
		<>
			<ApiServiceContextProvider>
				<NewsContainer />
			</ApiServiceContextProvider>
		</>
	)
}

export default App
