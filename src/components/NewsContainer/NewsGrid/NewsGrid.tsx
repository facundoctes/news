import React from "react"
import { Alert } from "react-bootstrap"
import { News } from "../../../models/newsModels"
import NewsCard from "../NewsCard/NewsCard"

interface INewsGridProps {
	news: News[];
}

const NewsGrid = React.memo((props: INewsGridProps) => {
  console.log('render', 'newsGrid');
	return (
    <>
        {(props.news?.length && props.news.map((news: News) => <NewsCard key={news.id} news={news} />)) || <Alert variant="secondary my-4 mx-4">
    There are no News to List!
  </Alert>}
    </>
    )
})

export default NewsGrid