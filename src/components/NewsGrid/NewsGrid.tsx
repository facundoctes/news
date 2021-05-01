import React, { useCallback, useContext, useState } from "react"
import NewsCard from "./NewsCard/NewsCard"
import SearchBar from "./SearchBar/SearchBar"
import { Pagination } from "react-bootstrap"
import { ApiServiceContext } from "../../ApiServiceContext/ApiServiceContext"
import { News } from "../../models/newsModels"
import "./NewsGrid.css"

const NewsGrid = () => {
	const ApiService = useContext(ApiServiceContext)
	const pageSize: number = 9;
	const [newsList, setNewsList] = useState<News[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [page, setPage] = useState<number>(0)
	const [errorMessage, setErrorMessage] = useState<string>("")

	const searchRequest = useCallback(
		async (textQuery: string) => {
			setIsLoading(true)
			try {
				const response = await ApiService.searchNews({ q: textQuery, page, pageSize })
				setNewsList(response.value || [])
				setIsLoading(false)
			} catch (error) {
				setIsLoading(false)
				setErrorMessage(error)
			}
		},
		[ApiService, page, pageSize]
	)

	return (
		<>
			<SearchBar searchRequest={searchRequest} title="Search News" />
			{isLoading && "Loading...."}
			<div className='d-flex flex-wrap justify-content-center bg-secondary w-100 '>
				{(newsList.length && newsList.map((news: News) => <NewsCard key={news.id} news={news} />)) || "Empty"}
			</div>
			{errorMessage !== "" && `Error: ${errorMessage}`}
			<div className='d-flex justify-content-center my-4'>
				<Pagination>
					<Pagination.Item key={1} active={true}>
						1
					</Pagination.Item>

					<Pagination.Item key={2} active={false}>
						2
					</Pagination.Item>

					<Pagination.Item key={3} active={false}>
						3
					</Pagination.Item>
				</Pagination>
			</div>
		</>
	)
}

export default NewsGrid
