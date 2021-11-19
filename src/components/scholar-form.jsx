import { useState } from 'react'

export default function ScholarForm({ onSubmit }) {
	let [ scholarName, setScholarName ] = useState('')
	let [ ronin, setRonin ] = useState('')
	let [ roninForPay, setRoninForPay ] = useState('')

	const handleChange = (evt) => {
		const { name, value } = evt.target

		switch(name) {
			case 'scholar-name':
				setScholarName(value)
				break

			case 'ronin':
				setRonin(value)
				break

			case 'ronin-pay':
				setRoninForPay(value)
				break

			default:
				break
		}
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()

		let newScholar = {
			name: scholarName,
			ronin,
			roninForPay
		}

		onSubmit(newScholar)
	}

	return (
		<div>
			<h1>Nuevo Becado</h1>
			<form onSubmit={ handleSubmit }>
				<p>
					<label>Nombre: </label>
	            	<input type="text" name="scholar-name"
	            		placeholder="Mario"
	            		value={ scholarName } onChange={ handleChange } required/>
				</p>

				<p>
	            	<label>Ronin: </label>
	            	<input type="text" name="ronin"
	            		placeholder="0x000..."
	            		value={ ronin } onChange={ handleChange } required/>
				</p>

				<p>
	            	<label>Ronin (pagos): </label>
	            	<input type="text" name="ronin-pay"
	            		placeholder="0x000..."
	            		value={ roninForPay } onChange={ handleChange }/>
				</p>
				<p>
	            	<label>Discord: </label>
	            	<input type="text" name="ronin-pay"
	            		placeholder="name@1234"
	            		value={ roninForPay } onChange={ handleChange }/>
				</p>
				
				<button>Agregar</button>
			</form>
		</div>
	)
}