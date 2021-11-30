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
				onAction({ type: 'scholar:delete', payload })
				break

			case 'mark':
				onAction({ type: 'scholar:mark', payload })
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
					<button onClick= { () => handleAction('edit', scholar.ronin) }>edit</button>
					<button onClick= { () => handleAction('del', scholar.ronin) }>del</button>
					<button onClick={ () => handleAction('mark', scholar.ronin) }>listo</button>
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
			<button onClick={() => handleAction('new')}>Nuevo becado</button>
			<button onClick={() => handleAction('update-server')}>Actualizar Servidor</button>

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