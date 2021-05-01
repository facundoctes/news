import React, { useCallback, useContext, useEffect, useState } from "react"
import SearchBar from "../NewsContainer/SearchBar/SearchBar"
import { ApiServiceContext } from "../../ApiServiceContext/ApiServiceContext"
import { News } from "../../models/newsModels"
import Paginator from "../NewsContainer/Paginator/Paginator"
import NewsGrid from "./NewsGrid/NewsGrid"
import { Alert, Spinner } from "react-bootstrap"

import "./NewsContainer.css"

const NewsContainer = () => {
	console.log('render', 'newsContainer');
	const pageSize: number = 6

	const ApiService = useContext(ApiServiceContext)

	const [searchText, setSearchText] = useState<string>('');
	const [newsList, setNewsList] = useState<News[]>([])
	const [totalCount, setTotalCount] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [pageNumber, setPageNumber] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>("")

	const searchRequest = useCallback(
		async (textQuery: string) => {
			if(textQuery === ''){
				return
			}
			console.log('search', textQuery, pageNumber, pageSize)
			setIsLoading(true)
			try {
				const response = await ApiService.searchNews({ q: textQuery, pageNumber, pageSize })
				setNewsList(response.value || [])
				console.log(response)
				setTotalCount(response.totalCount)
				setIsLoading(false)
				setSearchText(textQuery)
				setErrorMessage('')
			} catch (error) {
				setIsLoading(false)
				setErrorMessage('UPS! Something bad happened, please try again later.')
			}
		},
		[ApiService, pageNumber]
	)

	useEffect(()=> {
		searchRequest(searchText);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[ pageNumber, searchRequest ]);

	return (
		<>
			<div className='d-flex align-items-center flex-column mb-2'>
				<SearchBar searchRequest={searchRequest} title='Search News' />
				{errorMessage && <Alert variant="danger" className="col-4">{errorMessage}</Alert>}
			</div>

			<div className='d-flex flex-wrap justify-content-center bg-secondary w-100 '>
				{(isLoading && <Alert variant="secondary my-1"><Spinner animation="grow" variant="secondary"/></Alert>) || <NewsGrid news={newsList}/>}
			</div>
			{totalCount > 0 && (
				<div className='d-flex justify-content-center my-4'>
					<Paginator page={pageNumber} totalCount={totalCount} pageSize={pageSize} setPage={setPageNumber}/>
				</div>
			)}
		</>
	)
}

export default NewsContainer
