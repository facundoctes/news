import React, { useState } from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"

import "./SearchBar.css"

interface searchProps {
	searchRequest: any
}

const SearchBar = (props: searchProps) => {
	const [textQuery, setTextQuery] = useState<string>("")

	const searchQuery = () =>{
		props.searchRequest(textQuery);
		setTextQuery('');
	}

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center mb-4'>
				<InputGroup className='col-9 col-md-10 col-lg-9'>
					<FormControl
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='basic-addon2'
						value={textQuery}
						onChange={(e) => setTextQuery(e.target.value)}
					/>
					<InputGroup.Append>
						<Button variant='primary' onClick={searchQuery} >Search</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>
		</>
	)
}

export default SearchBar
