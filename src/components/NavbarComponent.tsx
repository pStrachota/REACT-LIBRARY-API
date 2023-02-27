import {MDBNavbar} from 'mdb-react-ui-kit'
import {useAccountState} from '../context/AccountContext'
import jwt from 'jwt-decode'

export const NavbarComponent = () => {

	const {token} =
        useAccountState()

	const isAuthenticated = !!token

	let user = ''
	let decodedToken = ''

	if (isAuthenticated) {
		decodedToken = jwt(token)
		user = JSON.parse(JSON.stringify(decodedToken)).sub
	}

	return (
		<>
			<MDBNavbar className="d-flex justify-content-between" expand='lg' light bgColor='light'>
				<h2 className="px-3 text text-primary">Library Management Website</h2>

				<h2 className="px-3 text text-primary">Welcome back {user}!</h2>

			</MDBNavbar>

		</>
	)
}
