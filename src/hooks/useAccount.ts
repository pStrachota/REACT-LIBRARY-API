import { useNavigate } from 'react-router'
import { api } from '../api/api'
import { TOKEN } from '../constants'
import { useAccountState } from '../context/AccountContext'
import { Pathnames } from '../router/pathnames'
import jwt from 'jwt-decode'

export const useAccount = () => {
	const navigate = useNavigate()
	const { token, setToken, isLoggingIn, setIsLoggingIn } =
		useAccountState()

	const isAuthenticated = !!token

	let isAdmin = false
	let decodedToken = ''

	if (isAuthenticated) {
		decodedToken = jwt(token)
		isAdmin = JSON.parse(JSON.stringify(decodedToken)).role == 'admin'
	}

	const logOut = async () => {
		try {
			localStorage.removeItem(TOKEN)
			navigate(Pathnames.public.login)
		} catch {
			console.log('error when logging out')
		} finally {
			navigate(Pathnames.public.login)
			setToken(null)
		}
	}

	const logIn = async (login: string, password: string) => {
		try {
			setIsLoggingIn(true)
			const { data } = await api.logIn(login, password)
			setToken(data)
		} catch {
			console.log('error when logging in')
			await logOut()
		} finally {
			setIsLoggingIn(false)
		}
	}

	return {
		token,
		isLoggingIn,
		isAuthenticated,
		isAdmin,
		logIn,
		logOut,
	}
}
