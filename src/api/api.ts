import {ApiResponseType} from '../types/ApiResponse'
import {apiWithConfig} from './api.config'
import {IRent, IRentCreate} from '../types/Rent'
import {Admin, Client, Manager} from '../types/User'
import {Article, Book} from '../types/RentableItem'

export const api = {
	logIn: (login: string, password: string): ApiResponseType<string> => {
		return apiWithConfig.post('/auth/login', {
			login,
			password
		}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	},
	getRents: (): ApiResponseType<IRent[]> => {
		return apiWithConfig.get('/rent')
	},
	makeRent: (createRent: IRentCreate): ApiResponseType<IRentCreate> => {
		return apiWithConfig.post('/rent', {
			rentableItemsIds: createRent.rentableItemsIds,
			clientId: createRent.clientId
		})
	},
	endRent: (rentId: number): ApiResponseType<IRent> => {
		return apiWithConfig.delete(`/rent/${rentId}`)
	},
	getBooks: (): ApiResponseType<Book[]> => {
		return apiWithConfig.get('/rentable-item/book')
	},
	addBook: (createBook: Book): ApiResponseType<Book> => {
		return apiWithConfig.post('/rentable-item/book', {
			author: createBook.author,
			title: createBook.title,
			serialNumber: createBook.serialNumber,
			publishingHouse: createBook.publishingHouse
		})
	},
	addAdmin: (createAdmin: Admin): ApiResponseType<Admin> => {
		return apiWithConfig.post('/user/admin', {
			name: createAdmin.name,
			surname: createAdmin.surname,
			login: createAdmin.login,
			password: createAdmin.password,
			privileges: createAdmin.privileges,
			position: createAdmin.position

		})
	},
	addManager: (createManager: Manager): ApiResponseType<Manager> => {
		return apiWithConfig.post('/user/manager', {
			name: createManager.name,
			surname: createManager.surname,
			login: createManager.login,
			position: createManager.position,
			password: createManager.password

		})
	},
	addClient: (createClient: Client): ApiResponseType<Client> => {
		return apiWithConfig.post('/user/client', {
			name: createClient.name,
			surname: createClient.surname,
			login: createClient.login,
			password: createClient.password,
			street: createClient.address.street,
			city: createClient.address.city,
			number: createClient.address.number
		})
	},
	addArticle: (createArticle: Article): ApiResponseType<Article> => {
		return apiWithConfig.post('/rentable-item/article', {
			author: createArticle.author,
			title: createArticle.title,
			serialNumber: createArticle.serialNumber,
			parentOrganisation: createArticle.parentOrganisation
		})
	},
	getArticles: (): ApiResponseType<Article[]> => {
		return apiWithConfig.get('/rentable-item/article')
	},
	getAdmins: (): ApiResponseType<Admin[]> => {
		return apiWithConfig.get('/user/admin')
	},
	getClients: (): ApiResponseType<Client[]> => {
		return apiWithConfig.get('/user/client')
	},
	getManagers: (): ApiResponseType<Manager[]> => {
		return apiWithConfig.get('/user/manager')
	},
	changePassword(userId: number, currentPassword: string, newPassword: string) {
		return apiWithConfig.put(`/user/password/${userId}`, {
			currentPassword,
			newPassword
		})
	}
}
