import React from "react"
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
} from "react-router-dom"

export default function App(props) {

	return (
		<>
			<Router>
				<div>
					<ul>
						<li><Link to="/performance-levels">niveles de desempeño</Link></li>
						<li><Link to="/performance-level-form">nuevo nivel de desempeño</Link></li>
						<li><Link to="/scholars">becados</Link></li>
						<li><Link to="/scholar-form">nuevo becado</Link></li>
					</ul>
				</div>
				<Routes>
					<Route path="/performance-levels" element={<h1>Niveles de desempeño</h1>}/>
					<Route path="/scholars" element={<h1>Becado</h1>}/>
					<Route path="/" element={<h1>inicio</h1>}/>
				</Routes>
			</Router>
		</>
	)
}