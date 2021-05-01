import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { Image, News } from "../../../models/newsModels"
import Modal from "react-modal"

import "./NewsCard.css"

interface INewsCardProps {
	news: News
}

const customStyles = {
	content: {
		width: "50%",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
}

const NewsCard = (props: INewsCardProps) => {
	const [showImage, setShowImage] = useState<boolean>(false)
	console.log("render", "newscard");
	const bodyDescription = (body: string): string => {
		const bodyWords = body.split(" ");
		return bodyWords.length > 20 ? `${bodyWords.slice(0, 19).join(" ")}...` : body;
	}

	const handleClickImage = () => {
		setShowImage(true);
	}

	const cardImage = (image: Image) => {
		const imageSrc = (image.thumbnail?.length && image.thumbnail) || "images/noimage.png";

		return <Card.Img className='cardImage' variant='top' src={imageSrc} onClick={handleClickImage} />;
	}

	return (
		<>
			<Modal isOpen={showImage} onRequestClose={() => setShowImage(false)} style={customStyles} ariaHideApp={false}>
				<img
					className='w-100'
					src={props.news.image?.url || "images/noimage.png"}
					alt={props.news.image?.title || "No description"}
				/>
			</Modal>
			<Card className='m-2 col-9 col-sm-5 col-md-5 col-lg-3 newsCard'>
				<Card.Body>
					<Card.Title className='cardTitle'>{props.news.title}</Card.Title> 
					{cardImage(props.news.image)}
					<Card.Text>{bodyDescription(props.news.body)}</Card.Text>
				</Card.Body>
				<Card.Body className='d-flex align-items-end flex-column'>
					<Card.Link className='mt-auto' target='_blank' href={props.news.url}>
						Read More...
					</Card.Link>
				</Card.Body>
			</Card>
		</>
	)
}

export default NewsCard
