import { useState, useEffect } from 'react'

export default function PerformanceLevelForm({ nextMinSLP, onSubmit }) {

	let [level, setLevel] = useState(0)
	let [ranges, setRanges] = useState([])

	let [topSLP, setTopSLP] = useState(0)

	let [scholarPercent, setScholarPercent] = useState(0)

	let [managerPercent, setManagerPercent] = useState(0)
	let [invPercent, setInvPercent] = useState(100)

	useEffect(() => {
		setTopSLP(nextMinSLP + 1)
		console.log(`${JSON.stringify(ranges, null, 4)}`)
	}, [nextMinSLP, ranges])

	const handleInputChange = (evt) => {
		console.log('PerformanceLevelForm - handleInputChange')

		let { name, value } = evt.target
		value = Number(value)

		let newInvPercent = 0

		switch(name) {
			case 'level':
				setLevel(value)
				break

			case 'top':
				setTopSLP(value)
				break

			case 'scholar-percent':
				newInvPercent = 100 - managerPercent - value

				if (newInvPercent >= 0) {
					setScholarPercent(value)
					setInvPercent(newInvPercent)
				}

				break

			case 'manager-percent':
				newInvPercent = 100 - scholarPercent - value

				if (newInvPercent >= 0) {
					setManagerPercent(value)
					setInvPercent(newInvPercent)
				}
					
				break

			case 'inv-percent':
				setInvPercent(value)
				break

			default:
				break
		}
	}

	const handleNewRange = () => {
		console.log(`PerformanceLevelForm - handle new range`)
		const newRange = {
			slp: topSLP,
			percentage: {
				scholar: scholarPercent,
				managerPercent: managerPercent,
				investor: invPercent
			}
		}

		setRanges([...ranges, newRange])
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
		console.log('PerformanceLevelForm - handleSubmit')

		let performLevel = {
			slp: {
				bottom: nextMinSLP,
				top: topSLP
			},

			percentage: {
				scholar: scholarPercent,
				manager: managerPercent,
				investor: invPercent
			}
		}

		//console.log(performLevel)
		onSubmit(performLevel)
	}

	return (
		<div>
			<h1>Escala de Desempeño</h1>

			<form onSubmit={ handleSubmit }>
				<table border="1">
					<thead>
						<tr>
							<th rowSpan="3">Nivel</th>
							<th rowSpan="2">Rango de SLP</th>
							<th colSpan="3">Porcentage de pagos</th>
						</tr>
						<tr>
							<th>Becado</th>
							<th>Manager</th>
							<th>Inversor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowSpan="2">
								<input type="number" name="level" value={ level } onChange={ handleInputChange } required/>
							</td>
							<td>74</td>
							<td>20%</td>
							<td>30%</td>
							<td>50%</td>
							<td><button>x</button></td>
						</tr>
						<tr>
							<td>
								<input type="number" name="top"  value={ topSLP } onChange={ handleInputChange }
		            				min={ nextMinSLP + 1 }/>
		            		</td>
							<td>
								<input type="number" name="scholar-percent"
					            	min='0' max='100'
					            	value={ scholarPercent } onChange={ handleInputChange }/>
							</td>
							<td>
								<input type="number" name="manager-percent"
					            	min='0' max='100'
					            	value={ managerPercent } onChange={ handleInputChange }/>
							</td>
							<td>
								<input type="number" name="inv-percent" disabled
		              				value={ invPercent } onChange={ handleInputChange }/>
							</td>
							<td onClick={ handleNewRange }><button>+</button></td>
						</tr>
					</tbody>
				</table>
				<button>Agregar Nivel</button>
	        </form>
		</div>
	)
}