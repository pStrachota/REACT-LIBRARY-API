import {NavbarComponent} from '../components/NavbarComponent'
import {SidebarComponent} from '../components/SidebarComponent'
import React from 'react'

export const HomeLayout = ({children}: { children: React.ReactNode }) => {

	return (
		<>
			<div className="container-fluid">
				<NavbarComponent/>
				<div className="row mt-3">
					<div style={{
						minWidth: '250px',
					}} className="col-2">
						<SidebarComponent/>
					</div>
					<div className="col-10 w-responsive">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
