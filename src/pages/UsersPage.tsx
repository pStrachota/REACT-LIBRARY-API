import {
	MDBBtn,
	MDBIcon,
	MDBTable,
} from 'mdb-react-ui-kit'
import {useEffect, useState} from 'react'
import {AddAdminModalComponent} from '../components/AddAdminModalComponent'
import {AddManagerModalComponent} from '../components/AddManagerModalComponent'
import {AddClientModalComponent} from '../components/AddClientModalComponent'
import {Admin, Client, Manager} from '../types/User'
import {api} from '../api/api'

export const UsersPage = () => {

	const [showAddManagersModal, setShowAddManagersModal] = useState(false)
	const [showAddClientsModal, setShowAddClientsModal] = useState(false)
	const [showAddAdminsModal, setShowAddAdminsModal] = useState(false)

	const [admins, setAdmins] = useState<Admin[]>([])
	const [clients, setClients] = useState<Client[]>([])
	const [managers, setManagers] = useState<Manager[]>([])

	useEffect(() => {
		api.getAdmins().then((response) => {
			setAdmins(response.data)
		}
		).catch((error) => {
			console.log(error)
		}
		)
	}, [])

	useEffect(() => {
		api.getClients().then((response) => {
			setClients(response.data)
		}
		).catch((error) => {
			console.log(error)
		}
		)
	}, [])

	useEffect(() => {
		api.getManagers().then((response) => {
			setManagers(response.data)
		}
		).catch((error) => {
			console.log(error)
		}
		)
	}, [])

	return (
		<>

			<h1 className="my-3">Admins</h1>
			<MDBBtn onClick={() => {
				setShowAddAdminsModal(true)
			}}>
				<MDBIcon className="px-3" icon="plus"/>
                Add admin
			</MDBBtn>
			<MDBTable className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Name</th>
						<th scope='col'>Surname</th>
						<th scope='col'>Login</th>
						<th scope='col'>Privileges</th>
						<th scope='col'>Position</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((user, index) => (
						<tr key={user.id}>
							<th scope='row'>{index + 1}</th>
							<td>{user.name}</td>
							<td>{user.surname}</td>
							<td>{user.login}</td>
							<td>{user.privileges}</td>
							<td>{user.position}</td>
						</tr>
					))}
				</tbody>
			</MDBTable>

			<h1 className="my-3">Managers</h1>
			<MDBBtn onClick={() => {
				setShowAddManagersModal(true)
			}}>
				<MDBIcon className="px-3" icon="plus"/>
                Add manager
			</MDBBtn>
			<MDBTable className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Name</th>
						<th scope='col'>Surname</th>
						<th scope='col'>Login</th>
						<th scope='col'>Position</th>
					</tr>
				</thead>
				<tbody>
					{managers.map((user, index) => (
						<tr key={user.id}>
							<th scope='row'>{index + 1}</th>
							<td>{user.name}</td>
							<td>{user.surname}</td>
							<td>{user.login}</td>
							<td>{user.position}</td>
						</tr>
					))}
				</tbody>
			</MDBTable>
			<h1 className="my-3">Clients</h1>
			<MDBBtn onClick={() => {
				setShowAddClientsModal(true)
			}}>
				<MDBIcon className="px-3" icon="plus"/>
                Add client
			</MDBBtn>
			<MDBTable className="table table-striped table-hover">
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Name</th>
						<th scope='col'>Surname</th>
						<th scope='col'>Login</th>
						<th scope='col'>Street</th>
						<th scope='col'>City</th>
						<th scope='col'>House Number</th>
					</tr>
				</thead>
				<tbody>
					{clients.map((user, index) => (
						<tr key={user.id}>
							<th scope='row'>{index + 1}</th>
							<td>{user.name}</td>
							<td>{user.surname}</td>
							<td>{user.login}</td>
							<td>{user.address.street}</td>
							<td>{user.address.city}</td>
							<td>{user.address.number}</td>
						</tr>
					))}
				</tbody>
			</MDBTable>
			<AddAdminModalComponent showAddAdminModal={showAddAdminsModal}
				setShowAddAdminModal={setShowAddAdminsModal}/>
			<AddManagerModalComponent showAddManagerModal={showAddManagersModal}
				setShowAddManagerModal={setShowAddManagersModal}
			/>
			<AddClientModalComponent showAddClientModal={showAddClientsModal}
				setShowAddClientModal={setShowAddClientsModal}
			/>
		</>
	)
}
