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
import {Admin} from '../types/User'

const schema = yup.object({
	name: yup.string().required('Name is required').min(4, 'Must be at least 4 characters'),
	surname: yup.string().required('Surname is required').min(4, 'Must be at least 4 characters'),
	login: yup.string().required('Login is required').min(4, 'Must be at least 4 characters'),
	password: yup.string().required('Password is required').min(8, 'Must be at least 8 characters'),
	privileges: yup.string().required('Privileges are required').min(10, 'Must be at least 10 characters'),
	position: yup.string().required('Position is required').min(10, 'Must be at least 10 characters'),
})

type AdminFormType = yup.InferType<typeof schema>

export const AddAdminModalComponent = ({
	showAddAdminModal,
	setShowAddAdminModal
}: { showAddAdminModal: boolean, setShowAddAdminModal: Dispatch<boolean> }) => {


	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<AdminFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({name, surname, login, password, privileges, position}) => {

		const id = 1

		const newAdmin: Admin = {
			id,
			name,
			surname,
			login,
			password,
			privileges,
			position
		}

		api.addAdmin(newAdmin).then(
			() => {
				setShowAddAdminModal(false)
			},
			(reason) => {
				console.log(reason)
			}
		)
	})

	return (
		<>
			<MDBModal show={showAddAdminModal} setShow={setShowAddAdminModal} tabIndex='-1'>
				<MDBModalDialog>
					<MDBModalContent>
						<MDBModalHeader>
							<MDBModalTitle>Fill new admin info</MDBModalTitle>
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
								required label='Login' id='typeLogin' type='text'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.login?.message}
							</div>

							<MDBInput {...register('password')}
								required label='Password' id='typePassword' type='password'/>
							<div className='text-danger mb-3' style={{fontSize: '12px'}}>
								{errors.password?.message}
							</div>
							<MDBInput {...register('privileges')}
								required label='Privileges' id='typePrivileges' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.privileges?.message}
							</div>
							<MDBInput {...register('position')}
								required label='Position' id='typePosition' type='text'/>
							<div className='text-danger  mb-3' style={{fontSize: '12px'}}>
								{errors.position?.message}
							</div>
						</MDBModalBody>

						<MDBModalFooter>
							<MDBBtn color='secondary' onClick={() => {
								setShowAddAdminModal(false)
							}}>Close
							</MDBBtn>
							<MDBBtn onClick={onSubmit}>Add new admin</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	)
}

