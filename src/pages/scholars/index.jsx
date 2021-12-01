import { useState, useEffect, useReducer } from 'react'
//import ScholarsTable from '../../components/scholar-table'

//import NewScholarForm from '../../components/scholar-form'
import NewScholarForm from './new-form'
import EditScholarForm from './edit-form'
import ScholarsTable from './table'

import Button from '../../components/button'

const HOST = process.env.REACT_APP_D

const API = {
	updateServer: async () => {
		console.group(`API - updateServer()`)
		
        await fetch(`${HOST}/updt`, {
            method: 'get'
        })
        console.log(`Data updated`)
		
		console.groupEnd()
		
	},

	getScholars: async () => {
		console.group(`API - getScholars()`)
		
		const res = await fetch(`${HOST}/v2/scholars`, {
            method: 'get'
        })

        const json = await res.json()
        
        console.log(`the scholars are: ${JSON.stringify(json.scholars, null, 4)}`)
		
		console.groupEnd()
		return json.scholars
		
	},

	addScholar: async (scholar) => {
		console.group(`API - addScholar()`)
		
		const res = await fetch(`${HOST}/v2/scholars`, {
            method: 'post',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ scholar })
        })

        const json = await res.json()

        console.log(json)
		
		console.groupEnd()
		
	},

	deleteScholar: async (ronin) => {
		console.group(`API - deleteScholar()`)
		
        let res = await fetch(`${HOST}/v2/scholars/${ronin}`, {
            method: 'delete'
        })

        let json = await res.json()
        console.log('response: ', json)
        
        console.groupEnd()
		return json
	},

	markScholar: async (ronin) => {
		console.groupCollapsed(`API - markScholar()`)
        
        console.log(`Markin ronin: ${ronin}`)

        let res = await fetch(`${HOST}/v2/scholars/${ronin}/history`, {
            method: 'put'
        })

        let data = await res.json()

        console.log(data)
        
        console.groupEnd()
	}
}

export default function Scholars({}) {
	// posible mode: table, new, edit
	const [ state, dispatch ] = useReducer(reducer, 
		{ 
			mode: 'table',
			newScholar: null,
			editScholar: null,
			delete: null,
			mark: null,
			update: null,
 
			scholars: [],
		}
	)

	const updateScholars = async () => {
		const scholars = await API.getScholars()
		dispatch({ 
			type: 'scholars', 
			payload: scholars
		})
	}

	// First change
	useEffect(() => {
		API.getScholars()
			.then( scholars => {
				dispatch({ 
					type: 'scholars', 
					payload: scholars
				})
			})
	}, [])

	useEffect(() => {
		const ronin = state.delete
		if(ronin) {
			console.log(`delete ronin: ${state.delete}`)
			API.deleteScholar(ronin)
			.then( _ => updateScholars() )
		}
	}, [state.delete])

	useEffect(() => {
		
		const ronin = state.mark
		if(ronin) {
			console.log(`marking: ${ronin}`)
			API.markScholar(ronin)
				.then( _ => updateScholars() )
		}
	}, [state.mark])

	useEffect(() => {
		let { newScholar } = state
		if(newScholar) {
			console.log('upload new scholar: ', JSON.stringify(newScholar, null, 4))
			API.addScholar(newScholar)
				.then( _ => updateScholars() )
		}
	}, [state.newScholar])

	useEffect(() => {
		if(state.update){
			console.log('updating server')
			API.updateServer()
			.then( _ => updateScholars() )
		}
	}, [state.update])

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
	const { type, payload } = action
	switch(type){
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

			if(payload){
				//newState.scholars = state.scholars.concat(action.payload)
				newState.newScholar = payload
			}

			return newState
			break

		case 'scholar:edit':
			console.log(`edit scholar ${JSON.stringify(payload, null, 4)}`)
			newState = {
				...state,
				mode: 'table'
			}

			if(payload){
				//newState.scholars = state.scholars.concat(action.payload)
				newState.editScholar = payload
			}

			return newState
			break

		case 'scholar:delete':
			return {
				...state,
				delete: payload
			}
			break

		case 'scholar:mark':
			return {
				...state,
				mark: action.payload
			}
			break

		//------------------

		case 'scholars':
			console.log(`the scholars are: ${JSON.stringify(payload, null, 4)}`)
			return {
				...state,
				scholars: payload
			}
			break

		case 'update-server':
			console.log('update server')
			return {
				...state,
				update: Date.now()
			}
			break		

		default:
			throw new Error('Unknow actions')
			break
	}
}