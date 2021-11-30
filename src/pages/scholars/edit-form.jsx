export default function EditForm({ scholar, onAction }) {
	console.log(`${scholar}`)
	return (
			<>
				<h1>Edit { scholar.ronin }</h1>
				<button onClick={() => { onAction({ type: 'edit:end'})}}>Actualizar</button>
			</>


		)
}