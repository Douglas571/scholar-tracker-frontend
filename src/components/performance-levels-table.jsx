export default function PerformanceLevelsTable({ data, onDelete }) {

	return (
		<div>
			<h1>Niveles de Desempeño</h1>

			<table border='1'>
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th colSpan="3">Porcentaje</th>
						<th colSpan="2" rowSpan="2"></th>

					</tr>
					<tr>
						<th>Nivel</th>
						<th>SLP</th>
						<th>Becado</th>
						<th>Manager</th>
						<th>Inversor</th>
					</tr>
				</thead>
				<tbody>
					{ data.map((level) => (
						<tr key={ level.id }>
							<td>{ level.level }</td>
							<td>{ level.slp.bottom } - { level.slp.top }</td>
							<td>{ level.percentage.scholar }</td>
							<td>{ level.percentage.manager }</td>
							<td>{ level.percentage.investor }</td>
							<td><button onClick={ (evt) => onDelete(level.id) }>del</button></td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	)
}