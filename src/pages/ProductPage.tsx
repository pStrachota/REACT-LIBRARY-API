import {
	MDBBtn,
	MDBIcon,
	MDBTable,
} from 'mdb-react-ui-kit'
import {useEffect, useState} from 'react'
import {AddBookModalComponent} from '../components/AddBookModalComponent'
import {AddArticleModalComponent} from '../components/AddArticleModalComponent'
import {api} from '../api/api'
import {Article, Book} from '../types/RentableItem'

export const ProductPage = () => {

	const [books, setBooks] = useState<Book[]>([])
	const [articles, setArticles] = useState<Article[]>([])
	const [showModal, setShowModal] = useState(false)
	const [showArticleModal, setShowArticleModal] = useState(false)


	useEffect(() => {
		api.getBooks().then((response) => {
			console.log(response)
			setBooks(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}, [])

	useEffect(() => {
		api.getArticles().then((response) => {
			console.log(response)
			setArticles(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}, [])

	return (
		<>

			<h1 className="my-3">Books</h1>
			<MDBBtn onClick={() => {
				setShowModal(true)
			}}>
				<MDBIcon className="px-3" icon="plus"/>
                Add book
			</MDBBtn>
			<MDBTable className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Author</th>
						<th scope="col">Title</th>
						<th scope="col">Serial number</th>
						<th scope="col">Publishing house</th>
						<th scope="col">Is available</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.rentableItemId}>
							<th scope="row">{book.rentableItemId}</th>
							<td>{book.author}</td>
							<td>{book.title}</td>
							<td>{book.serialNumber}</td>
							<td>{book.publishingHouse}</td>
							<td>{book.available ? 'Yes' : 'No'}</td>
						</tr>
					))}
				</tbody>
			</MDBTable>

			<h1 className="text-cente my-4">Articles</h1>

			<MDBBtn onClick={() => {
				setShowModal(true)
			}}>
				<MDBIcon className="px-3" icon="plus"/>
                Add article
			</MDBBtn>

			<MDBTable className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Author</th>
						<th scope="col">Title</th>
						<th scope="col">Serial number</th>
						<th scope="col">Parent organisation</th>
						<th scope="col">Is available</th>
					</tr>
				</thead>
				<tbody>
					{articles.map((article) => (
						<tr key={article.rentableItemId}>
							<th scope="row">{article.rentableItemId}</th>
							<td>{article.author}</td>
							<td>{article.title}</td>
							<td>{article.serialNumber}</td>
							<td>{article.parentOrganisation}</td>
							<td>{article.available ? 'Yes' : 'No'}</td>
						</tr>
					))}
				</tbody>
			</MDBTable>

			<AddBookModalComponent showAddBookModal={showModal} setShowAddBookModal={setShowModal}/>
			<AddArticleModalComponent showAddArticleModal={showArticleModal}
				setShowAddArticleModal={setShowArticleModal}/>
		</>
	)
}
