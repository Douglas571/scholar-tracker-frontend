import { useState } from 'react'

export default function NewForm({ onAction }){
	let [ newScholar, setNewScholar ] = useState({
		name: '',
		level: 1,
		ronin: '',
		roninForPay: '',
		discord: ''
	})

	const handleChange = (evt) => {
		const { name, value } = evt.target

		//reduce all this logic to ONE LINE
		//exp: newScholar[name] = value

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
		onAction({ type: 'scholars:add', payload: newScholar })
	}

	const handleAction = (action) => {
		switch(action){
			case 'cancel':
				onAction({ type: 'scholars:add'})
				break

			default:
				//throw new Error('Unknow action')
				break
		}
	}

	return (
		<>
			<div>
				<h1>Nuevo Becado</h1>
				<form onSubmit={handleSubmit}>
					<p>
						<label>Nombre: </label>
		            	<input type="text" name="scholar-name"
		            		placeholder="Mario"
		            		value={ newScholar.name } onChange={ handleChange } required/>
					</p>

					<p>
						<label>Nivel: </label>
		            	<input type="number" name="level"
		            		placeholder="0"
		            		value={ newScholar.level } onChange={ handleChange } required/>
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
					
					<button type="submit">Agregar</button>
					<button onClick={ () => handleAction('cancel') }>Cancelar</button>
				</form>
			</div>
		</>)
}