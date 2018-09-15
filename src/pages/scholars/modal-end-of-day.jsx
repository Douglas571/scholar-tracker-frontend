import { useState } from 'react'

const getLastEntries = (history) => {
	let lastEndOfDayEntry = {}
	let lastEntry = {}

	if(history.length > 0) {
		let endDayEntries = history
			.filter( e => e['end_day'])

		if( endDayEntries.length > 0 ) {
			lastEndOfDayEntry = endDayEntries[endDayEntries.length - 1]

		lastEntry = history[history.length - 1]
		if( lastEntry['end_day']) {
			lastEntry = {}
		}

	} else {
		console.log('no hay entradas')
	}
	return [lastEntry, lastEndOfDayEntry]
}

export default function ModalEndOfDay({ currentScholarMark={}, onAction }) {
	const history = currentScholarMark.history || []
	// for test: [{slp: 11, 'end_day': true}, {slp: 20}, {slp:30, 'end_day': true}, {slp: 40}]
	const [lastEntry, lastEndOfDayEntry] = getLastEntries(history)
	
	const [ newEntry, setNewEntry ] = useState({
		...lastEntry, 'end_day': true
	})

	const handleChange = (evt) => {
		const { value, name } = evt.target

		switch(name){
			case 'slp':
				setNewEntry({...newEntry, slp: Number(value)})
				break
		
			default:
				throw new Error(`Launch and error`)
				break
		}
	}

	return (
		<div>
			<div className="modal">
				<div className="modal-header">
					<p>Marcar fin del día</p>
				</div>
				<div className="modal-body">
					<p>Total de SLP</p>
					<p>
						<label>ayer: </label>
						<input type="number" 
							value={lastEndOfDayEntry.slp}
							disabled/>
					</p>
					<p>
						<label>hoy: </label>
						<input type="number"
							name="slp"
							placeholder={lastEntry.slp}
							min={lastEntry.slp}
							value={newEntry.slp}
							onChange={handleChange}/>
					</p>
					</div>
				<div className="modal-footer">
					<button onClick={() => {
						onAction({ type: 'scholar:mark', payload: newEntry })	
					}}>
						Listo
					</button>
					<button onClick={() => {
						onAction({ type: 'cancel' })
					}}>
						Cancelar
					</button>
				</div>
			</div>
		</div>
		)
}
