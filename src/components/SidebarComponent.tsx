import {MDBIcon} from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import jwt from 'jwt-decode'
import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar'
import {useAccount} from '../hooks/useAccount'

export const SidebarComponent = () => {

	const {token} = useAccount()

	let decodedToken = ''

	if (token != undefined) {
		decodedToken = jwt(token)
	}

	const role = JSON.parse(JSON.stringify(decodedToken)).role

	return (
		<>
			<Sidebar style={{}} className="shadow-5 text-primary fs-6">
				<Menu>
					{
						role === 'admin' ?
							<>
								<MenuItem icon={<MDBIcon icon="book-open"/>}
									component={<Link to="/products"/>}> Rentable Items</MenuItem>
								<MenuItem icon={<MDBIcon icon="key"/>} className="text-primary"
									component={<Link to="/change-password"/>}>
                                    Change password
								</MenuItem>
								<MenuItem icon={<MDBIcon icon="archive"/>}
									component={<Link to="/rents"/>}> Rents</MenuItem>
								<MenuItem icon={<MDBIcon icon="user-alt"/>}
									component={<Link to="/users"/>}> Users</MenuItem>
								<MenuItem icon={<MDBIcon icon="sign-out-alt"/>}
									component={<Link to="/logout-confirm"/>}> Logout</MenuItem>
							</>
							: role === 'manager' ?
								<>
									<MenuItem icon={<MDBIcon icon="book-open"/>}
										component={<Link to="/products"/>}> Rentable Items</MenuItem>
									<MenuItem icon={<MDBIcon icon="key"/>} component={<Link to="/change-password"/>}> Change
                                        password</MenuItem>
									<MenuItem icon={<MDBIcon icon="sign-out-alt"/>}
										component={<Link to="/logout-confirm"/>}> Logout</MenuItem>
								</>
								:
								<>
									<MenuItem icon={<MDBIcon icon="plus"/>} component={<Link to="/rent"/>}> Add new
                                        rent</MenuItem>
									<MenuItem icon={<MDBIcon icon="key"/>} component={<Link to="/change-password"/>}> Change
                                        password</MenuItem>
									<MenuItem icon={<MDBIcon icon="sign-out-alt"/>}
										component={<Link to="/logout-confirm"/>}> Logout</MenuItem>
								</>
					}
				</Menu>
			</Sidebar>
		</>
	)
}
