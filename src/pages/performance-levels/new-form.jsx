import { useState, useEffect, useRef } from 'react'

export default function PerformanceLevelForm({ onAction }) {

	let [ level, setLevel ] = useState(0)
	let [ ranges, setRanges ] = useState([])
	let [ rangePrevLength, setRangePrevLength ] = useState(ranges.length)
	let [ weeklyMin, setWeeklyMin ] = useState(527)

	let slpInput = useRef(null)


	let [newRange, setNewRange] = useState({
			order: 1,
			slp: 0,
			percentage: {
				scholar: 0,
				manager: 0,
				investor: 100
			}			
		})

	useEffect(() => {
		console.groupCollapsed(`useEffect - ranges`)
		
		console.log(`the ranges are: ${JSON.stringify(ranges, null, 4)}`)

		// si el valor range.length > prevRangeLength; entonces ejecutar proceso adicional
		if (ranges.length < rangePrevLength) {
			console.log(`curr: ${ranges.length} < prev: ${rangePrevLength}`)
			console.log(`borrado!!`)
			setNewRange({...newRange, order: (ranges.length + 1)})
			setRangePrevLength(ranges.length)


		} else {
			// si no; continuar normal
			setNewRange({...newRange, order: (ranges.length + 1)})
			setRangePrevLength(ranges.length)
		}
		
		
		console.groupEnd()
	}, [ ranges ])

	useEffect(() => {
		console.groupCollapsed('use effect')

		console.log(`the newRange: ${JSON.stringify(newRange, null, 4)}`)

		console.groupEnd()
	}, [ newRange ])

	const handleInputChange = (evt) => {
		console.groupCollapsed('PerformanceLevelForm - handleInputChange')

		let { name, value } = evt.target
		value = Number(value)

		let newInvPercent = 0

		switch(name) {
			case 'level':
				setLevel(value)
				break

			case 'top':
				setNewRange({...newRange, slp: value})
				break

			case 'scholar-percent':
				console.log(`the manager has: ${newRange.percentage.manager}`)
				newInvPercent = 100 - newRange.percentage.manager - value

				if (newInvPercent >= 0) {
					setNewRange({...newRange, percentage: { 
						...newRange.percentage,
						scholar: value,
						investor: newInvPercent } 
					})

					/*
						setScholarPercent(value)
						setInvPercent(newInvPercent)
					*/
				}

				break

			case 'manager-percent':
				newInvPercent = 100 - newRange.percentage.scholar - value

				if (newInvPercent >= 0) {
					setNewRange({...newRange,
						percentage: {
							...newRange.percentage,
							manager: value,
							investor: newInvPercent
						}
					})
				}
					
				break

			case 'inv-percent':
				break

			case 'weekly-min':
				setWeeklyMin(value)
				break

			default:
				break
		}
		console.groupEnd()
	}

	const handleAction = (evt) => {
		evt.preventDefault()
		console.groupCollapsed(`PerformanceLevelForm - handle action`)

		const order = Number(evt.target.getAttribute('rangeid'))
		const action = evt.target.getAttribute('action')

		console.log(`the content is: `)
		console.log(evt.target)
		console.log(`and action is: ${action}`)

		switch(action) {
			case 'create':
				console.log(`creating new range`)
				console.log(slpInput)
				slpInput.current.focus()
				setRanges([...ranges, newRange])
				break

			case 'delete':
				console.log(`the range to delete is: ${order}`)
				let newListOfRanges = ranges.filter( range => range.order !== order )
				newListOfRanges = newListOfRanges.map( (range, idx) => {
					range.order = (idx + 1)
					return range
				})
				
				console.log(`the new list of ranges are: ${JSON.stringify(newListOfRanges, null, 4)}`)

				setRanges([...newListOfRanges])
				break

			default:
				break
		}

		console.groupEnd()
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
		console.groupCollapsed('PerformanceLevelForm - handleSubmit')

		let performLevel = {
			level,
			ranges,
			weeklyMin
		}

		console.log(`the new performance level is: ${JSON.stringify(performLevel, null, 4)}`)
		console.groupEnd()

		onAction({ type: 'add', payload: performLevel })
	}

	let rangesHTML = ranges.map( (range, idx) => {
		if (idx == 0) {
			return (
					<tr key={ range.order }>
						<td rowSpan={ ranges.length + 1 }>
								<input type="number" name="level" value={ level } onChange={ handleInputChange } required/>
						</td>
						<td  rowSpan={ ranges.length + 1 }>
							<input type="number" name="weekly-min" value={ weeklyMin }  onChange={ handleInputChange }/>
						</td>
						<td>{ range.slp }</td>
						<td>{ range.percentage.scholar }%</td>
						<td>{ range.percentage.manager }%</td>
						<td>{ range.percentage.investor }%</td>
						<td><button rangeid={ range.order } action="delete" onClick={ handleAction }>x</button></td>
					</tr>
				)
		}

		return (
				<tr  key={ range.order }>
					<td>{ range.slp }</td>
					<td>{ range.percentage.scholar }%</td>
					<td>{ range.percentage.manager }%</td>
					<td>{ range.percentage.investor }%</td>
					<td><button rangeid={ range.order } action="delete" onClick={ handleAction }>x</button></td>
				</tr>
			)
	})

	return (
		<div>
			<h1>Escala de Desempeño</h1>

			<form onSubmit={ handleSubmit }>
				<table border="1">
					<thead>
						<tr>
							<th rowSpan="2">Nivel</th>
							<th rowSpan="2">Min. semanal</th>
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
						{ rangesHTML }
						<tr>
							{ ranges.length === 0 ? 
								<>
									<td rowSpan={ ranges.length + 1 }>
										<input type="number" name="level" value={ level } onChange={ handleInputChange } required/>
									</td>
									<td><input type="number" name="weekly-min" value={ weeklyMin }  onChange={ handleInputChange }/></td>
								</>	
								: null
							}
							<td>
								<input type="number" name="top" ref={ slpInput }  value={ newRange.slp } onChange={ handleInputChange }
		            				min={ 0 }/>
		            		</td>
							<td>
								<input type="number" name="scholar-percent"
					            	min='0' max='100'
					            	value={ newRange.percentage.scholar } onChange={ handleInputChange }/>
							</td>
							<td>
								<input type="number" name="manager-percent"
					            	min='0' max='100'
					            	value={ newRange.percentage.manager } onChange={ handleInputChange }/>
							</td>
							<td>
								<input type="number" name="inv-percent" disabled
		              				value={ newRange.percentage.investor } onChange={ handleInputChange }/>
							</td>
							<td><button key={ null } action="create" onClick={ handleAction }>+</button></td>
						</tr>
					</tbody>
				</table>
				<button type="submit">Agregar Nivel</button>
				<button onClick={() => onAction({ type: 'add' })}>Cancelar</button>
	        </form>
		</div>
	)
}