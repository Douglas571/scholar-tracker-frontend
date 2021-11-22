export default function ScholarTable({ data, onSort, sortBy, sortTopDown }) {
	let defaultIcon = '˄˅'
	let selectedIcon = (sortTopDown)? '˅': '˄'

	console.groupCollapsed(`ScholarTable - main`)

	console.log('selectedIcon: ', selectedIcon)
	console.log('sortBy: ', sortBy)

	console.groupEnd()

	let scholarRows = data.map( scholar => {
		scholar.slp = (scholar.slp)? scholar.slp : {}
		scholar.mmr = scholar.mmr || {}
		scholar.slpToPay = (scholar.slpToPay)? scholar.slpToPay : {}

		return (
			<tr>
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
			<table  border="1">
				<thead>
					<tr>
						<th colSpan='5'></th>

						<th colSpan='3'>SLP</th>

						<th colSpan='3'>Porcentage de Pagos en SLP</th>
						<th colSpan='2'></th>
					</tr>
					<tr>
						<th>Nombre ˄˅</th>
						<th>Discord</th>
						<th onClick={ () => onSort('mmr') }>MMR <button>{ (sortBy === 'mmr')? selectedIcon: defaultIcon}</button></th>
						<th>Nivel ˄˅</th>
						<th onClick={ () => onSort('percent') }>% <button>{ (sortBy === 'percent')? selectedIcon: defaultIcon}</button></th>

						<th onClick={ () => onSort('slp') }>
							Hoy<button>{ (sortBy === 'slp')? selectedIcon: defaultIcon}</button>
						</th>
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