import React from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useFormik } from "formik"

import "./SearchBar.css"

interface searchProps {
	searchRequest: (textQuery: string) => Promise<void>
	title: string
}

interface SearchForm {
	searchBox?: string
}

const initialValues: SearchForm = {
	searchBox: ""
}

const validate = (values: SearchForm) => {
	let errors: SearchForm = {}

	if (!values.searchBox || values.searchBox.length < 5) {
		errors.searchBox = "The search term must be greater than 4 characters;"
	}

	return errors
}

const SearchBar = React.memo((props: searchProps) => {
	console.log('render', 'searchbar');
	const formik = useFormik({
		initialValues,
		onSubmit: (values: SearchForm) => {
			if (values.searchBox) {
				props.searchRequest(values.searchBox)
			}
		},
		validate,
	})

	return (
		<>
			{props.title && <h2>{props.title}</h2>}
			<form className='w-100 d-flex justify-content-center' onSubmit={formik.handleSubmit}>
				<InputGroup className='col-9 col-md-10 col-lg-9 mb-1'>
					<FormControl
						id='searchBox'
						placeholder='Search term'
						aria-label='Search term'
						aria-describedby='basic-addon2'
						onChange={formik.handleChange}
						value={formik.values.searchBox}
					/>
					<InputGroup.Append>
						<Button variant='primary' type='submit'>
							Search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</form>
			{formik.errors.searchBox && <div className='text-danger'>{formik.errors.searchBox}</div>}
		</>
	)
})

export default SearchBar
