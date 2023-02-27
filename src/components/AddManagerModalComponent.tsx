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
import {Manager} from '../types/User'
import {api} from '../api/api'

const schema = yup.object({
	name: yup.string().required('Name is required').min(4, 'Must be at least 4 characters'),
	surname: yup.string().required('Surname is required').min(4, 'Must be at least 4 characters'),
	login: yup.string().required('Login is required').min(4, 'Must be at least 4 characters'),
	password: yup.string().required('Password is required').min(8, 'Must be at least 8 characters'),
	position: yup.string().required('Position is required').min(10, 'Must be at least 10 characters'),
})

type ManagerFormType = yup.InferType<typeof schema>

export const AddManagerModalComponent = ({
	showAddManagerModal,
	setShowAddManagerModal
}: { showAddManagerModal: boolean, setShowAddManagerModal: Dispatch<boolean> }) => {


	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ManagerFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({name, surname, login, password, position}) => {
		const id = 1

		const newManager: Manager = {
			id,
			name,
			surname,
			login,
			password,
			position
		}

		api.addManager(newManager).then(
			() => {
				setShowAddManagerModal(false)
			},
			(reason) => {
				console.log(reason)
			}
		)
	})

	return (
		<>
			<MDBModal show={showAddManagerModal} setShow={setShowAddManagerModal} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Fill new manager info</MDBModalTitle>
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
								required label='Password' id='typePassword' type='password'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.password?.message}
							</div>
							<MDBInput {...register('position')}
								required label='Position' id='typePosition' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.position?.message}
							</div>
						</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => {
								setShowAddManagerModal(false)
							}}>Close
							</MDBBtn>
							<MDBBtn onClick={onSubmit}>Add new manager</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

