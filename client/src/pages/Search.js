import React from "react";
import Form from "../components/Form";
import Results from "../components/Results";
import API from "../utils/API";

class Search extends React.Component {
	state = {
		value: "",
		books: []
	};

	componentDidMount() {
		this.searchBook();
	}

	makeBook = bookData => {
		return {
			_id: bookData.id,
			title: bookData.volumeInfo.title,
			authors: bookData.volumeInfo.authors,
			description: bookData.volumeInfo.description,
			image: bookData.volumeInfo.imageLinks.thumbnail,
			link: bookData.volumeInfo.previewLink
		};
	};

	searchBook = query => {
		API.getBook(query)
			.then(res =>
				this.setState({
					books: res.data.items.map(bookData =>
						this.makeBook(bookData)
					)
				})
			)
			.catch(err => console.error(err));
	};

	handleInputChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.searchBook(this.state.search);
	};

	render() {
		return (
			<div>
				<Form
					search={this.state.search}
					handleInputChange={this.handleInputChange}
					handleFormSubmit={this.handleFormSubmit}
				/>
				<div className="container">
					<h2>Results</h2>
					<Results books={this.state.books} />
				</div>
			</div>
		);
	}
}

export default Search;

// function Search() {
// 	const [books, setBooks] = useState([]);
// 	const [formObject, setFormObject] = useState({});

// 	useEffect(() => {
// 		searchBooks();
// 	}, []);

// 	function searchBooks() {
// 		API.getBooks()
// 			.then(res => setBooks(res.data))
// 			.catch(err => console.log(err));
// 	}

// 	function handleInputChange(event) {
// 		const { name, value } = event.target;
// 		setFormObject({ ...formObject, [name]: value });
// 	}

// 	function handleFormSubmit(event) {
// 		event.preventDefault();
// 		if (formObject.title && formObject.author) {
// 			API.saveBook({
// 				title: formObject.title,
// 				author: formObject.author,
// 				synopsis: formObject.description,
// 				image: formObject.thumbnail,
// 				link: formObject.previewLink
// 			})
// 				.then(res => loadBooks())
// 				.catch(err => console.log(err));
// 		}
// 	}

// 	return (
// 		<div>
// 			<Form
// 				onChange={handleInputChange}
// 				name="title"
// 				placeholder="Title"
// 				disabled={!(formObject.author && formObject.title)}
// 				onClick={handleFormSubmit}
// 			/>
// 			<div className="container">
// 				<h2>Results</h2>
// 				<Results books={state.books} />
// 			</div>
// 		</div>
// 	);
// }

// export default Search();
