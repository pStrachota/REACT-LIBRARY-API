import {
	MDBBtn,
	MDBModalDialog,
	MDBModal,
	MDBModalHeader,
	MDBModalContent,
	MDBModalBody,
	MDBInput,
	MDBModalTitle,
	MDBModalFooter
} from 'mdb-react-ui-kit'
import React, {Dispatch} from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {api} from '../api/api'
import {Book} from '../types/RentableItem'


const schema = yup.object({
	author: yup.string().required('Author is required').min(4, 'Must be at least 4 characters'),
	title: yup.string().required('Title is required').min(4, 'Must be at least 4 characters'),
	publishingHouse: yup.string().required('Publishing House is required').min(4, 'Must be at least 4 characters'),
	serialNumber: yup.string().required('Serial Number is required').min(13, 'Must be 13 characters long').max(13, 'Must be 13 characters long')
})

type BookFormType = yup.InferType<typeof schema>

export const AddBookModalComponent = ({
	showAddBookModal,
	setShowAddBookModal
}: { showAddBookModal: boolean, setShowAddBookModal: Dispatch<boolean> }) => {

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<BookFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({author, title, serialNumber, publishingHouse}) => {

		const rentableItemId = 1

		const newBook: Book = {
			rentableItemId,
			author,
			title,
			serialNumber,
			publishingHouse
		}

		api.addBook(newBook).then(
			() => {
				setShowAddBookModal(false)
			},
			(reason) => {
				console.log(reason)
			}
		)

	})

	return (
		<>
			<MDBModal show={showAddBookModal} setShow={setShowAddBookModal} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Fill new book info</MDBModalTitle>
							<MDBBtn className='btn-close' color='none'></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>
							<MDBInput {...register('author')} label='Author' id='typeUsername' type='username'/>
							<div className='text-danger' style={{fontSize: '12px'}}>
								{errors.author?.message}
							</div>

							<MDBInput {...register('title')}
								className="mt-3" label='Title' id='typeEmail'
								type='email'/>

							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.title?.message}
							</div>

							<MDBInput {...register('serialNumber')}
								required label='Serial Number' id='typeSerialNumber' type='text'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.serialNumber?.message}
							</div>

							<MDBInput {...register('publishingHouse')}
								required label='Publishing house' id='typePublishingHouse' type='text'/>
							<div className='text-danger' style={{fontSize: '12px'}}>
								{errors.publishingHouse?.message}
							</div>
						</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => {
								setShowAddBookModal(false)
							}}>Close
							</MDBBtn>
							<MDBBtn onClick={onSubmit}>Add new book</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

