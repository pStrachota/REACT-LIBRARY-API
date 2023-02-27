import {
	MDBBadge,
	MDBBtn,
	MDBIcon,
	MDBTable
} from 'mdb-react-ui-kit'
import {useEffect, useRef, useState} from 'react'
import jwt from 'jwt-decode'
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog'
import {Toast} from 'primereact/toast'
import {api} from '../api/api'
import {IRentCreate} from '../types/Rent'
import {useAccountState} from '../context/AccountContext'
import {Article, Book} from '../types/RentableItem'

export const MakeARentPage = () => {

	const [books, setBooks] = useState<Book[]>([])
	const [articles, setArticles] = useState<Article[]>([])
	const [selectedProductIds, setSelectedProductIds] = useState<number[]>([])
	const {token} =
        useAccountState()

	useEffect(() => {
		api.getBooks().then((response) => {
			console.log(response)
			setBooks(response.data)
		}
		).catch((error) => {
			console.log(error)
		}
		)
	}, [])

	useEffect(() => {
		api.getArticles().then((response) => {
			console.log(response)
			setArticles(response.data)
		}
		).catch((error) => {
			console.log(error)
		}
		)
	}, [])

	let decodedToken = ''

	if (token != undefined) {
		decodedToken = jwt(token)
	}

	const userId = JSON.parse(JSON.stringify(decodedToken)).jti

	const makeRent = () => {

		const rentCreate: IRentCreate = {
			rentableItemsIds: selectedProductIds,
			clientId: userId
		}

		api.makeRent(rentCreate)
			.then((response) => {
				console.log(response)
			}, (error) => {
				console.log(error)
			})
	}

	const toast = useRef<Toast>(null)

	const accept = () => {
		if (toast != null) {
			makeRent()
            toast!.current!.show({severity: 'info', summary: 'Confirmed', detail: 'You have made an order', life: 3000})
		}
	}

	const reject = () => {
        toast!.current!.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000})
	}

	const confirm1 = () => {
		confirmDialog({
			message: 'Are you sure you want to make an order?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept,
			reject
		})
	}

	return (
		<>

			<div className="container-fluid">
				<Toast ref={toast}/>
				<ConfirmDialog/>

				<div className="d-flex justify-content-between">

					<h1 className="my-3">Choose items for rent</h1>

					<MDBBtn className="px-3 fs-6" disabled={
						selectedProductIds.length === 0
					} onClick={() => {
						confirm1()
					}}>
						<MDBBadge className="mx-1 " color='danger' pill>{selectedProductIds.length}</MDBBadge>
                        Make an order
					</MDBBtn>
				</div>

				<h2 className="my-4">Books</h2>

				<MDBTable className="table table-striped table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Author</th>
							<th scope="col">Title</th>
							<th scope="col">Is available</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<tr key={book.rentableItemId}>
								<th scope="row">{book.rentableItemId}</th>
								<td>{book.author}</td>
								<td>{book.title}</td>
								<td>{book.available ?
									<MDBIcon icon="check" size="lg" className="text-green"/>
									:
									<MDBIcon icon="times" size="lg" className="text-danger"/>
								}</td>
								<td>
									{
										book.available === false ?
											<MDBBtn disabled={true} color="danger">Product not available</MDBBtn> :
											selectedProductIds.includes(book.rentableItemId) ?
												<MDBBtn disabled={true} color="success">Added</MDBBtn> :
												<MDBBtn onClick={() => {
													setSelectedProductIds([...selectedProductIds, book.rentableItemId])
												}
												} color="success">Add</MDBBtn>
									}
								</td>
							</tr>
						))}
					</tbody>
				</MDBTable>

				<h2 className="my-4">Articles</h2>

				<MDBTable className="table table-striped table-hover">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Author</th>
							<th scope="col">Title</th>
							<th scope="col">Is available</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{articles.map((article) => (
							<tr key={article.rentableItemId}>
								<th scope="row">{article.rentableItemId}</th>
								<td>{article.author}</td>
								<td>{article.title}</td>
								<td>{article.available ?
									<MDBIcon icon="check" size="lg" className="text-green"/>
									:
									<MDBIcon icon="times" size="lg" className="text-danger"/>
								}</td>
								<td>
									{
										!article.available ?
											<MDBBtn disabled={true} color="danger">Product not available</MDBBtn> :
											selectedProductIds.includes(article.rentableItemId) ?
												<MDBBtn disabled={true} color="success">Added</MDBBtn> :
												<MDBBtn onClick={() => {
													setSelectedProductIds([...selectedProductIds, article.rentableItemId])
												}
												} color="success">Add</MDBBtn>
									}
								</td>
							</tr>
						))}
					</tbody>
				</MDBTable>
			</div>
		</>
	)
}
