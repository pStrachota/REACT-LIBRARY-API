import {MDBBtn} from 'mdb-react-ui-kit'
import {useNavigate} from 'react-router'
import {Pathnames} from '../router/pathnames'

export const LogOutConfirmationPage = () => {

	const navigate = useNavigate()

	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100" >
			<h1 className="mb-4 text-primary" >Are you sure you want to log out?</h1>
			<MDBBtn className="bg-danger" onClick={() => {
				navigate(Pathnames.public.logout)
			}}>Yes</MDBBtn>
		</div>
	)
}
