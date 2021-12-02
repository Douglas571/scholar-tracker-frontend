import { useState } from 'react'

const ModalEndOfDay = ({ currentScholarMark={}, onAction }) => {

	console.group(`ModalEndOfDay - render`)
	
	console.log(currentScholarMark)
	const history = [{slp: 10, 'end_day': true}, {slp: 20}, {slp:30, 'end_day': true}]//currentScholarMark.history || []
	let lastHistoryEndOfDayEntry = {}
	let lastHistoryEntry = {}

	if(history.length > 0) {
		lastHistoryEndOfDayEntry = history
			.reverse()
			.find( e => e['end_day'] === true )

		lastHistoryEntry = history[history.length - 1]

	} else {
		console.log('no hay entradas')
	}
	
	console.groupEnd()
	

	const [ newEntry, setNewEntry ] = useState({
		...lastHistoryEntry
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
						<input type="number"/>
					</p>
					<p>
						<label>hoy: </label>
						<input type="number"
							name="slp"
							placeholder={1100}
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

export default function ScholarTable(props) {
	const { 
		scholars, 
		onSort, 
		sortBy, 
		sortTopDown,

		onAction,

	} = props

	let defaultIcon = '˄˅'
	let selectedIcon = (sortTopDown)? '˅': '˄'

	console.groupCollapsed(`ScholarTable - main`)

	console.log('selectedIcon: ', selectedIcon)
	console.log('sortBy: ', sortBy)

	console.groupEnd()

	const handleAction = (action, payload) => {

		switch(action) {
			case 'update-server':
				onAction({ type: 'update-server'})
				break

			case 'new':
				onAction({ type: 'change-mode', payload: { mode: 'new'}})
				break

			case 'edit':
				console.log(payload)
				onAction({ 
					type: 'change-mode', 
					payload: { mode: 'edit', scholar: payload}})
				break

			case 'del':
				if(!window.confirm("¿Abortar eliminación?")) {
					onAction({ type: 'scholar:delete', payload })
				}
				break

			case 'mark':
				console.log(payload)
				onAction({ type: 'scholar:mark:start', payload })
				break

			default:
				break
		}
	}

	let scholarRows = scholars.map( scholar => {
		scholar.slp = (scholar.slp)? scholar.slp : {}
		scholar.mmr = scholar.mmr || {}
		scholar.slpToPay = (scholar.slpToPay)? scholar.slpToPay : {}

		return (
			<tr key={ scholar.ronin }>
				<td>
					<button onClick= { () => handleAction('edit', scholar) }>edit</button>
					<button onClick= { () => handleAction('del', scholar.ronin) }>elm</button>
					<button onClick={ () => handleAction('mark', scholar) }>marcar</button>
				</td>

				<td>{ scholar.name }</td>
				<td>{ scholar.discord }</td>
				<td>{ scholar.mmr.total }</td>
				<td>{ scholar.performance }</td>
				<td>{ scholar.percent }</td>


				<td>{ scholar.slp.today }</td>
				<td>{ scholar.slp.total }</td>
				<td>{ scholar.slp.accumulate }</td>
				

				<td>{ scholar.slpToPay.self }</td>
				<td>{ scholar.slpToPay.manager }</td>
				<td>{ scholar.slpToPay.investor }</td>

				<td>{ scholar.ronin }</td>
				<td>{ scholar.roninForPay }</td>

			</tr>)
	})

	return (
		<div>
			<h1>Becados</h1>
			<button onClick={() => handleAction('update-server')}>Actualizar Servidor</button>
			<button onClick={() => handleAction('new')}>Nuevo becado</button>

			<ModalEndOfDay 
				currentScholarMark={props.currentScholarMark}
				onAction={onAction}/>

			<table  border="1">
				<thead>
					<tr>
						<th colSpan='6'></th>

						<th colSpan='3'>SLP</th>

						<th colSpan='3'>Porcentage de Pagos en SLP</th>
						<th colSpan='2'></th>
					</tr>
					<tr>
						<th></th>
						<th>Nombre ˄˅</th>
						<th>Discord</th>
						<th>MMR</th>
						<th>Nivel ˄˅</th>
						<th>%</th>

						<th>Hoy</th>
						<th>Total</th>
						<th>Pago acumulado</th>

						<th>Becado ˄˅</th>
						<th>Manager ˄˅</th>
						<th>Inversor ˄˅</th>

						<th>Ronin ˄˅</th>
						<th>Ronin (pagos) ˄˅</th>
					</tr>
				</thead>
				<tbody>
					{ scholarRows }
				</tbody>
			</table>
		</div>
	)
}