import React from "react"
import { Card, Button } from 'react-bootstrap';
import { Image, News } from "../../../models/newsModels";

interface INewsCardProps {
	news: News
}

const NewsCard = (props : INewsCardProps) => {
	const bodyDescription = (body: string): string => {
		const bodyWords = body.split(' ');
		return bodyWords.length > 20 ? `${bodyWords.slice(0,20).join(' ')}...` : body;
	}

	const cardImage = (image: Image) => {
		const imageSrc = (image.thumbnail?.length && image.thumbnail) || 'images/noimage.png'

		return <Card.Img variant='top' src={imageSrc} />
	}

	return (
		<>
		<Card className='m-2 col-9 col-md-5 col-lg-3'>
			{cardImage(props.news.image)}
			<Card.Body>
				<Card.Title>{props.news.title}</Card.Title>
				<Card.Text>{bodyDescription(props.news.body)}</Card.Text>
				<Button variant='primary'>Read More...</Button>
			</Card.Body>
		</Card>
		</>
	)
}

export default NewsCard
