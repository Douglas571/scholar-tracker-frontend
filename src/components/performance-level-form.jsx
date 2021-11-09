import { useState, useEffect } from 'react'

export default function PerformanceLevelForm({ nextMinSLP, onSubmit }) {

	let [topSLP, setTopSLP] = useState(0)

	let [scholarPercent, setScholarPercent] = useState(0)

	let [managerPercent, setManagerPercent] = useState(0)
	let [invPercent, setInvPercent] = useState(100)

	useEffect(() => {
		setTopSLP(nextMinSLP + 1)
	}, [nextMinSLP])

	const handleInputChange = (evt) => {
		console.log('PerformanceLevelForm - handleInputChange')

		let { name, value } = evt.target
		value = Number(value)

		let newInvPercent = 0

		switch(name) {

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
	            <p>
	            	<label>SLP:</label>
	            	<input type="number" name="bottom" 
	            		value={ nextMinSLP } onChange={ handleInputChange } disabled/>
	            	-
	            	<input type="number" name="top"  value={ topSLP } onChange={ handleInputChange }
	            	min={ nextMinSLP + 1 }/>
	            </p>
	            
	            <h2>Porcentajes</h2>
	            <p>
	            	<label>Becado:</label>
	            	<input type="number" name="scholar-percent"
	            	min='0' max='100'
	            	value={ scholarPercent } onChange={ handleInputChange }/>
	            </p>
	            <p>
	            	<label>Manager:</label>
	            	<input type="number" name="manager-percent"
	            	min='0' max='100'
	            	value={ managerPercent } onChange={ handleInputChange }/>
	            </p>
	            <p>
	            	<label>Inversor:</label>
	            	<input type="number" name="inv-percent" disabled
	              		value={ invPercent } onChange={ handleInputChange }/>
	            </p>

	            <button type='submit'>Enviar</button>
	        </form>
		</div>
	)
}