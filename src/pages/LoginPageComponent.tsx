import {Navigate} from 'react-router-dom'
import {useAccount} from '../hooks/useAccount'
import {Pathnames} from '../router/pathnames'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {MDBBtn, MDBInput} from 'mdb-react-ui-kit'
import React from 'react'
import {LoaderComponent} from '../components/LoaderComponent'

const schema = yup.object({
	login: yup.string().required('Login is required').min(2, 'Must be at least 2 characters'),
	password: yup.string().required('Password is required'),
})

type LoginFormType = yup.InferType<typeof schema>

export const LoginPageComponent = () => {

	const {isLoggingIn, isAuthenticated, logIn} = useAccount()

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({login, password}) => {
		logIn(login, password)
	})

	if (isLoggingIn) {
		return <LoaderComponent/>
	}

	if (isAuthenticated) {
		return <Navigate to={Pathnames.client.home} replace/>
	}

	return (
		<div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100">
			<h3>Login</h3>
			<div style={{
				maxWidth: '300px',
				width: '100%',
				marginBottom: '20px'
			}}>
				<MDBInput {...register('login')} label='login'
					id='typeLogin' type='text'/>
				<div className='text-danger' style={{fontSize: '12px'}}>
					{errors.login?.message}
				</div>

			</div>
			<div style={{
				maxWidth: '300px',
				width: '100%',
				marginBottom: '20px'
			}}>
				<MDBInput {...register('password')} label='password'
					id='typePassword' type='password'/>
				<div className='text-danger' style={{fontSize: '12px'}}>
					{errors.password?.message}
				</div>
			</div>
			<MDBBtn onClick={onSubmit}>Sign in</MDBBtn>
		</div>
	)
}
