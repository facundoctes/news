import React from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { ErrorMessage, useFormik } from 'formik';

import "./SearchBar.css"
import { fork } from "node:cluster";

interface searchProps {
	searchRequest: (textQuery: string) => Promise<void>;
	title: string;
}

interface SearchForm {
	searchBox?: string;
}

const initialValues: SearchForm =  {
	searchBox: '',
}

const validate = (values: SearchForm) => {
	let errors: SearchForm = {};

	if (!values.searchBox || values.searchBox.length < 5 ) {
		errors.searchBox = 'The search term must be greater than 4 characters;'
	}

	return errors;
}

const SearchBar = (props: searchProps) => {
	const formik = useFormik({
		initialValues,
		onSubmit: (values: SearchForm) => {
			if (values.searchBox) {
				props.searchRequest(values.searchBox);
			}
		},
		validate,
	})

	return (
		<>
			<div className='d-flex flex-wrap justify-content-center mb-4'>
				{props.title && <h2>{props.title}</h2>}
				<form className="w-100" onSubmit={formik.handleSubmit}>
				<InputGroup className='col-9 col-md-10 col-lg-9'>
					<FormControl
					 	id="searchBox"
						placeholder="Search term"
						aria-label="Search term"
						aria-describedby='basic-addon2'
						onChange={formik.handleChange}
						value={formik.values.searchBox}
					/>
					<InputGroup.Append>
						<Button variant='primary'  type="submit" >Search</Button>
					</InputGroup.Append>
				</InputGroup>
				{ formik.errors.searchBox && <div className="text-danger">{formik.errors.searchBox}</div>}
				</form>
			</div>
		</>
	)
}

export default SearchBar
