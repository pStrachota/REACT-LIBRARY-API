import {MDBBtn, MDBTable} from 'mdb-react-ui-kit'
import {useEffect, useState} from 'react'
import {api} from '../api/api'
import {IRent} from '../types/Rent'

export const RentPage = () => {

	const [rents, setRents] = useState<IRent[]>([])

	const endRent = (id: number) => {
		api.endRent(id).then((response) => {
			console.log(response)
			setRents(rents.filter((rent) => rent.rentId !== id))
		}).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		api.getRents().then((response) => {
			setRents(response.data)
		}
		).catch((error) => {
			console.log(error)
		})
	}, [])

	return (
		<>
			<MDBTable className="px-3" striped bordered hover>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Begin time</th>
						<th scope="col">End time</th>
						<th scope="col">Is ended</th>
						<th scope="col">Rentable items</th>
						<th scope="col">Client</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{rents.map((rent, index) => {
						return (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{rent.beginTime}</td>
								<td>{rent.endTime}</td>
								<td>{rent.ended ? 'Yes' : 'No'}</td>
								<td>{rent.rentableItems.map((item) => {
									return (
										<p key={index}>{item.title}</p>
									)
								})}</td>
								<td>{rent.client.name} {rent.client.surname}</td>
								<td>
									<MDBBtn className="px-3 mx-3 bg-danger" disabled={rent.ended} onClick={() => {
										endRent(rent.rentId)
									}}>
                                        End rent
									</MDBBtn>

								</td>
							</tr>
						)})}
				</tbody>
			</MDBTable>
		</>
	)
}


