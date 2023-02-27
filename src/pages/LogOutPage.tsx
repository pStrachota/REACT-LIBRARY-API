import {useEffect} from 'react'
import {TOKEN} from '../constants'
import {MDBBtn} from 'mdb-react-ui-kit'
import {useNavigate} from 'react-router'
import {Pathnames} from '../router/pathnames'
import {useAccountState} from '../context/AccountContext'

export const LogOutPage = () => {

	const {setToken} =
        useAccountState()

	const navigate = useNavigate()

	useEffect(() => {
		localStorage.removeItem(TOKEN)
		setToken(null)
	}, [])

	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<h1 className="mb-4 text-primary">LogOut succesfully!</h1>
			<MDBBtn onClick={() => {
				navigate(Pathnames.public.login)
			}}>Login again</MDBBtn>
		</div>
	)
}
