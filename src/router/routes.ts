// import { AccountsPageComponent } from '../pages/admin/AccountsPage'
// import { AccountsPageComponent } from '../pages/admin/AccountsPage'
import { RouteType } from '../types/Route'
import { Pathnames } from './pathnames'
import {ProductPage} from '../pages/ProductPage'
import {ChangePasswordPage} from '../pages/ChangePasswordPage'
import {MakeARentPage} from '../pages/MakeARentPage'
import {RentPage} from '../pages/RentPage'
import {HomePage} from '../pages/HomePage'
import {UsersPage} from '../pages/UsersPage'
import {LoginPageComponent} from '../pages/LoginPageComponent'
import {LogOutPage} from '../pages/LogOutPage'
import {LogOutConfirmationPage} from '../pages/LogOutConfirmationPage'


export const userRoutes: RouteType[] = [
	{
		path: Pathnames.client.home,
		Component: HomePage,
	},
	{
		path: Pathnames.client.products,
		Component: ProductPage,
	},
	{
		path: Pathnames.client.password,
		Component: ChangePasswordPage,
	},
	{
		path: Pathnames.client.rent,
		Component: MakeARentPage,
	},
	{
		path: Pathnames.client.showRent,
		Component: RentPage,
	},
	{
		path: Pathnames.client.users,
		Component: UsersPage,
	},
	{
		path: Pathnames.client.logoutConfirmation,
		Component: LogOutConfirmationPage,
	},

]

export const publicRoutes: RouteType[] = [
	{
		path: Pathnames.public.login,
		Component: LoginPageComponent,
	},
	{
		path: Pathnames.public.logout,
		Component: LogOutPage,
	},
]

export const adminRoutes: RouteType[] = [
	{
		path: Pathnames.admin.users,
		Component: UsersPage,
	},
	{
		path: Pathnames.admin.rents,
		Component: RentPage,
	},
]
