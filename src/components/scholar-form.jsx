import { useState } from 'react'

export default function ScholarForm({ onSubmit }) {
	let [ newScholar, setNewScholar ] = useState({
		name: '',
		level: 1,
		ronin: '',
		roninForPay: '',
		discord: ''
	})

	const handleChange = (evt) => {
		const { name, value } = evt.target

		switch(name) {
			case 'scholar-name':
				setNewScholar({...newScholar, name: value})
				break

			case 'level':
				setNewScholar({...newScholar, level: value})
				break

			case 'ronin':
				setNewScholar({...newScholar, ronin: value})
				break

			case 'ronin-pay':
				setNewScholar({...newScholar, roninForPay: value})
				break

			case 'discord':
				setNewScholar({...newScholar, discord: value})
				break

			default:
				break
		}
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
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
	            		value={ newScholar.name } onChange={ handleChange } required/>
				</p>

				<p>
	            	<label>Ronin: </label>
	            	<input type="text" name="ronin"
	            		placeholder="0x000..."
	            		value={ newScholar.ronin } onChange={ handleChange } required
	            		pattern="(?<start>((0x)|(ronin:)|()))(?<addrs>([(a-f)(0-9)]{2}){20})"/>
				</p>

				<p>
	            	<label>Ronin (pagos): </label>
	            	<input type="text" name="ronin-pay"
	            		placeholder="0x000..."
	            		value={ newScholar.roninForPay } onChange={ handleChange }/>
				</p>
				<p>
	            	<label>Discord: </label>
	            	<input type="text" name="discord"
	            		placeholder="name@1234"
	            		value={ newScholar.discord } onChange={ handleChange }/>
				</p>
				
				<button>Agregar</button>
			</form>
		</div>
	)
}