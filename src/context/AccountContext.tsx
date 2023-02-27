import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { TOKEN } from '../constants'

interface AccountState {
	token: string | null
	setToken: (item: string | null) => void
	isLoggingIn: boolean
	setIsLoggingIn: (value: boolean) => void
}

const AccountStateContext = createContext<AccountState | null>(null)

export const AccountStateContextProvider = ({ children }: { children: ReactNode }) => {

	const [token, setToken] = useState<string | null>('')
	const [isLoggingIn, setIsLoggingIn] = useState(false)

	useEffect(() => {
		if (token?.length) {
			localStorage.setItem(TOKEN, JSON.stringify(token))
		}

	}, [token])

	useEffect(() => {
		if (localStorage.getItem(TOKEN)) {
			setToken(JSON.parse(localStorage.getItem(TOKEN) || ''))
		}
	}, [])

	return (
		<AccountStateContext.Provider
			value={{ token, setToken, isLoggingIn, setIsLoggingIn }}
		>
			{children}
		</AccountStateContext.Provider>
	)
}

export const useAccountState = () => {
	const accountState = useContext(AccountStateContext)

	if (!accountState) {
		throw new Error('You forgot about AccountStateContextProvider!')
	}

	return accountState
}
