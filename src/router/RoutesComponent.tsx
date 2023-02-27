import {Navigate, Route, Routes} from 'react-router-dom'
import {useAccount} from '../hooks/useAccount'
import {Pathnames} from './pathnames'
import {adminRoutes, publicRoutes, userRoutes} from './routes'
import {HomeLayout} from '../layout/HomeLayout'

export const RoutesComponent = () => {
	const {isAuthenticated, isAdmin} = useAccount()

	return (
		<Routes>
			{publicRoutes.map(({path, Component}) => (
				<Route
					key={path}
					path={path}
					element={
						<Component/>
					}
				/>
			))}

			{isAuthenticated &&
                userRoutes.map(({path, Component}) => (
                	<Route
                		key={path}
                		path={path}
                		element={
                			<HomeLayout>
                				<Component/>
                			</HomeLayout>
                		}/>
                ))
			}

			{isAuthenticated && isAdmin &&
				adminRoutes.map(({path, Component}) => (
					<Route
						key={path}
						path={path}
						element={
							<HomeLayout>
								<Component/>
							</HomeLayout>
						}/>
				))
			}

			<Route path="*" element={<Navigate to={Pathnames.public.login} replace/>}/>
		</Routes>
	)
}
