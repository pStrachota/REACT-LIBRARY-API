import {useForm} from 'react-hook-form'
import jwt from 'jwt-decode'
import {MDBBtn, MDBInput} from 'mdb-react-ui-kit'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {FormHelperText} from '@mui/material'
import {api} from '../api/api'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useAccountState} from '../context/AccountContext'

const schema = yup.object({
	newPassword: yup.string().required('New password is required').min(8, 'Must be at least 8 characters'),
	currentPassword: yup.string().required('Current password is required').min(8, 'Must be at least 8 characters'),
	confirmPassword: yup.string().label('confirm password').required().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
})

type ChangePasswordFormType = yup.InferType<typeof schema>

export const ChangePasswordPage = () => {

	const { token } =
		useAccountState()

	const showToastMessage = () => {
		toast.success('Password changes!', {
			position: toast.POSITION.TOP_CENTER
		})
	}

	const showErrorToastMessage = () => {
		toast.error('Wrong password! Try again', {
			position: toast.POSITION.TOP_CENTER
		})
	}

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ChangePasswordFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(({newPassword, currentPassword, confirmPassword}) => {

		let decodedToken = ''

		if (token != undefined) {
			decodedToken = jwt(token)
		}

		const userId = JSON.parse(JSON.stringify(decodedToken)).jti

		api.changePassword(userId, currentPassword, newPassword).then(
			() => {
				showToastMessage()
			}
		).catch(
			(reason) => {
				console.log(reason)
				showErrorToastMessage()
			}
		)
	})

	return (
		<div className="container-fluid">
			<h3>Change Password</h3>
			<div style={{
				maxWidth: '400px',
				marginBottom: '20px'
			}}>
				<MDBInput {...register('currentPassword')} label='Current Password'
					type='password'/>
			</div>
			<div style={{
				maxWidth: '400px',
				marginBottom: '20px'
			}}>
				<MDBInput {...register('newPassword')} label='New Password'
					type='password'/>
				<FormHelperText id="login" error>
					{errors?.newPassword?.message}
				</FormHelperText>
			</div>
			<div style={{
				maxWidth: '400px',
				marginBottom: '20px'
			}}>
				<MDBInput {...register('confirmPassword')} label='Confirm New Password'
					type='password'/>
				<FormHelperText id="login" error>
					{errors?.confirmPassword?.message}
				</FormHelperText>
			</div>

			<MDBBtn onClick={onSubmit}>Change Password</MDBBtn>
			<ToastContainer/>
		</div>
	)
}
