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
import {Article} from '../types/RentableItem'

const schema = yup.object({
	author: yup.string().required('Author is required').min(4, 'Must be at least 4 characters'),
	title: yup.string().required('Title is required').min(4, 'Must be at least 4 characters'),
	parentOrganisation: yup.string().required('Parent Organisation is required').min(4, 'Must be at least 4 characters'),
	serialNumber: yup.string().required('Serial Number is required').min(13, 'Must be 13 characters long').max(13, 'Must be 13 characters long')
})

type ArticleFormType = yup.InferType<typeof schema>

export const AddArticleModalComponent = ({showAddArticleModal, setShowAddArticleModal}: { showAddArticleModal: boolean, setShowAddArticleModal: Dispatch<boolean> }) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ArticleFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({  author, title, serialNumber, parentOrganisation }) => {

		const rentableItemId =  1

		const newArticle: Article = {
			rentableItemId,
			author,
			title,
			serialNumber,
			parentOrganisation
		}

		api.addArticle(newArticle).then(
			() => {
				setShowAddArticleModal(false)
			},
			() => {
				console.log('error')
			}
		)
	})

	return (
		<>
			<MDBModal show={showAddArticleModal} setShow={setShowAddArticleModal} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Fill new article info</MDBModalTitle>
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

							<MDBInput {...register('parentOrganisation')}
								required label='Parent Organisation' id='typePublishingHouse' type='text'/>
							<div className='text-danger' style={{fontSize: '12px'}}>
								{errors.parentOrganisation?.message}
							</div>
						</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => {
								setShowAddArticleModal(false)
							}}>Close
							</MDBBtn>
							<MDBBtn onClick={onSubmit}>Add new article</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

