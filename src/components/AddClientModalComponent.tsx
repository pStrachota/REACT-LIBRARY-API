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
import {Address, Client} from '../types/User'
import {api} from '../api/api'


const schema = yup.object({
	name: yup.string().required('Name is required').min(4, 'Must be at least 4 characters'),
	surname: yup.string().required('Surname is required').min(4, 'Must be at least 4 characters'),
	login: yup.string().required('Login is required').min(4, 'Must be at least 4 characters'),
	password: yup.string().required('Password is required').min(8, 'Must be at least 8 characters'),
	street: yup.string().required('Street is required').min(5, 'Must be at least 5 characters'),
	city: yup.string().required('City is required').min(5, 'Must be at least 5 characters'),
	number: yup.string().required('House Number is required').min(5, 'Must be at least 5 characters'),
})

type ClientFormType = yup.InferType<typeof schema>

export const AddClientModalComponent = ({
	showAddClientModal,
	setShowAddClientModal
}: { showAddClientModal: boolean, setShowAddClientModal: Dispatch<boolean> }) => {

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ClientFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({name, surname, login, password, street, number, city}) => {
		const id = 1
		const id2 = 2

		const address: Address = {
			id: id2,
			street,
			number,
			city,
		}

		const newClient: Client = {
			id,
			name,
			surname,
			login,
			password,
			address,
		}

		api.addClient(newClient).then(
			() => {
				setShowAddClientModal(false)
			},
			(reason) => {
				console.log(reason)
			}
		)
	})

	return (
		<>
			<MDBModal show={showAddClientModal} setShow={setShowAddClientModal} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Fill new client info</MDBModalTitle>
							<MDBBtn className='btn-close' color='none'></MDBBtn>
						</MDBModalHeader>
						<MDBModalBody>
							<MDBInput {...register('name')} label='Name' id='typeUsername' type='username'/>
							<div className='text-danger' style={{fontSize: '12px'}}>
								{errors.name?.message}
							</div>

							<MDBInput {...register('surname')}
								className="mt-3" label='Surname' id='typeEmail'
								type='text'/>

							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.surname?.message}
							</div>

							<MDBInput {...register('login')}
								required label='Login' id='typeSerialNumber' type='text'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.login?.message}
							</div>

							<MDBInput {...register('password')}
								required label='Password' id='typePublishingHouse' type='password'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.password?.message}
							</div>
							<select id="clientTypeSelect" className="form-select mb-3"
								aria-label="Default select example">
								<option selected value="1">Student</option>
								<option value="2">University Employee</option>
								<option value="3">Outsider</option>
							</select>
							<MDBInput {...register('city')}
								required label='City' id='typePublishingHouse' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.city?.message}
							</div>
							<MDBInput {...register('street')}
								required label='Street' id='typePublishingHouse' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.street?.message}
							</div>
							<MDBInput {...register('number')}
								required label='House Number' id='typePublishingHouse' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.number?.message}
							</div>
						</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => {
								setShowAddClientModal(false)
							}}>Close
							</MDBBtn>
							<MDBBtn onClick={onSubmit}>Add new client</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

