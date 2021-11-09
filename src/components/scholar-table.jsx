export default function ScholarTable({ data }) {
	return (
		<div>
			<h1>Becados</h1>
			<table  border="1">
				<thead>
					<tr>
						<th colSpan='5'></th>
						<th colSpan='3'>SLP para</th>
						<th colSpan='2'></th>
					</tr>
					<tr>
						<th>Nombre</th>
						<th>SLP</th>
						<th>MMR</th>
						<th>Desempeño</th>
						<th>%</th>

						<th>Becado</th>
						<th>Manager</th>
						<th>Inversor</th>

						<th>Ronin</th>
						<th>Ronin (pagos)</th>
					</tr>
				</thead>
				<tbody>
					{ data.map( scholar => 
						<tr>
							<td>{ scholar.name }</td>
							<td>{ scholar.slp }</td>
							<td>{ scholar.mmr }</td>
							<td>{ scholar.performance }</td>
							<td>{ scholar.percent }</td>

							<td>{ scholar.slpToPay.self }</td>
							<td>{ scholar.slpToPay.manager }</td>
							<td>{ scholar.slpToPay.investor }</td>

							<td>{ scholar.ronin }</td>
							<td>{ scholar.roninForPay }</td>

						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}