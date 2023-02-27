import axios from 'axios'
import { TOKEN } from '../constants'

export const API_URL = 'https://localhost:8181/pas/api'
export const TIMEOUT_IN_MS = 30000

export const apiWithConfig = axios.create({
	baseURL: API_URL,
	timeout: TIMEOUT_IN_MS,
})

apiWithConfig.interceptors.request.use((config) => {
	const token = localStorage.getItem(TOKEN)
	if (token && config.headers) config.headers.Authorization ='Bearer ' + token.toString().replaceAll('"', '')
	return config
})

apiWithConfig.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status
		if (status === 401 || status === 403 || status === 404) {
			localStorage.removeItem(TOKEN)
		}
		return Promise.reject(error)
	},
)
