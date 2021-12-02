export default function PerformanceLevelsTable({ performanceLevels, onAction }) {
	//<td><button onClick={ (evt) => onDelete(level.id) }>del</button></td>

	let data = performanceLevels
	data = data || []
	
	return (
		<div>
			<h1>Niveles de Desempeño</h1>
			<div><button onClick={
					() => onAction(
						{ 
							type: 'change-mode', 
							payload: { mode: 'new' }
						}
					)
				}>Nuevo nivel</button>
			</div>

			<table border='1'>
				<thead>
					<tr>
						<th>Nivel</th>
						<th>Minimo semanal</th>
						<th  colSpan="4"></th>
					</tr>
				</thead>
				<tbody>

					{ (data.length > 0)? 
						data.map( level => {
							return (
								<tr key={ level.id }>
									<td>{ level.level }</td>
									<td>{ level.weeklyMin}</td>
									<td  colSpan="4">
										<table border="1">
											<tr>
												<th>SLP</th>
												<th>Becado</th>
												<th>Manager</th>
												<th>Inversor</th>
											</tr>
											{ level.ranges.map( range => (
												<tr key={ range.order }>
													<td>{ range.slp }</td>
													<td>{ range.percentage.scholar }%</td>
													<td>{ range.percentage.manager }%</td>
													<td>{ range.percentage.investor }%</td>
												</tr>
											))
											}
										</table>
									</td>
									<td><button onClick={ () => onAction({ type: 'delete', payload: level }) }>del</button></td>
								</tr>
							)
						})
						:
						<tr><td>no hay datos</td></tr>
					}

					
				</tbody>
			</table>

		</div>
	)
}