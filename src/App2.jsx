import { React, useState } from "react"
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
} from "react-router-dom"

import Scholars from './pages/scholars'
import PerformanceLevels from './pages/performance-levels'

export default function App() {

	const [ scholars, setScholars ] = useState([{ name: 'douglas'}])

	const handleActionsFromScholars = ({ type, payload }) => {
		console.log(`type: ${type}`)
		console.log(`payload: ${payload}`)
	}

	return (
		<>
			<Router>
				<div>
					<ul>
						<li><Link to="/">Inicio</Link></li>
						<li><Link to="/scholars">becados</Link></li>
						<li><Link to="/performance-levels">niveles de desempeño</Link></li>
					</ul>
				</div>
				<Routes>
					<Route path="/" element={<h1>Inicio</h1>}/>
					<Route path="/scholars" element={<Scholars data={scholars} onAction={ handleActionsFromScholars }/>}/>
					<Route path="/performance-levels" element={<PerformanceLevels/>}/>
					
				</Routes>
			</Router>
		</>
	)
}