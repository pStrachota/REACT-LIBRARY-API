import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'  //theme
import 'primereact/resources/primereact.min.css'                  //core css
import 'primeicons/primeicons.css'                                //icons

import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {AccountStateContextProvider} from './context/AccountContext'

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {ProSidebarProvider} from 'react-pro-sidebar'
import { RoutesComponent } from './router/RoutesComponent'


export const App = () => (
	<>
		<ProSidebarProvider>
			<AccountStateContextProvider>
				<Router>
					<RoutesComponent/>
				</Router>
			</AccountStateContextProvider>
		</ProSidebarProvider>
	</>

)
