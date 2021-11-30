import { useState, useEffect, useReducer } from 'react'
//import ScholarsTable from '../../components/scholar-table'

//import NewScholarForm from '../../components/scholar-form'
import NewScholarForm from './new-form'
import EditScholarForm from './edit-form'
import ScholarsTable from './table'

import Button from '../../components/button'

export default function Scholars({}) {
	let [ scholars, setScholars ] = useState([
		{ name: 'douglas', ronin: '0x000' },
	])

	// posible mode: view, new, edit
	const [ state, dispatch ] = useReducer(reducer, 
		{ 
			mode: 'table',
			delete: null,
			mark: null,
 
			scholars: [
				{ name: 'douglas', ronin: '0x0001' },
			],

			newScholar: null
		}
	)

	useEffect(() => {
		console.log(`delete ronin: ${state.delete}`)
		setScholars(scholars.filter( sh => sh.ronin !== state.delete))
	}, [state.delete])

	useEffect(() => {
		console.log(`marking ronin: ${state.mark}`)
	}, [state.mark])

	useEffect(() => {
		if(state.newScholar) {
			console.log('set new scholar')
			dispatch({ type: 'scholars:add' })	
		}


	}, [state.newScholar])

	let view
	console.log('mode: ', state.mode)
	switch(state.mode) {
		case 'table':
			view = (
				<ScholarsTable
					scholars={ state.scholars }
					onAction={ dispatch }/>)
			break

		case 'new':
			view = (
				<NewScholarForm 
					onAction={ dispatch }/>)
			break

		case 'edit':
			console.log(`${JSON.stringify(state, null, 4)}`)
			view = (
				<EditScholarForm 
					onAction={ dispatch }
					scholar={ state.currentEditing }/>
				)
			break

		default:
			break
	}
	
	return (
			<div>
				{ view }	
			</div>
		)
}

const reducer = (state, action) => {
	let newState = {}
	switch(action.type){
		case 'edit:start':
			console.log(action)
			return {
				...state,
				mode: 'edit',

				currentEditing: state.scholars.find( sh => sh.ronin === action.payload)
			}
			break

		case 'edit:end':
			console.log('edit')
			return {
				...state,
				mode: 'table'
			}
			break	

		//---------------
		case 'change-mode':
			newState = {
				...state,
				mode: action.payload.mode
			}

			if(newState.mode === 'edit') {
				newState.currentEditing = action.payload.scholar
			}

			return newState
			break			
		//--------------
		case 'scholars:add':
			newState = 
			{
				...state,

				mode: 'table'
			}

			if(action.payload)
				newState.scholars = state.scholars.concat(action.payload)

			return newState
			break

		case 'scholar:delete':
			return {
				...state,
				scholars: state.scholars.filter( sh => sh.ronin !== action.payload)
			}
			break

		case 'scholar:mark':
			return {
				...state,
				mark: action.payload
			}
			break

		//------------------
		case 'update-server':
			console.log('update server')
			return {
				...state,
				mode: 'table'
			}
			break		

		default:
			throw new Error('Unknow actions')
			break
	}
}