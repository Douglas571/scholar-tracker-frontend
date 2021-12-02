import { useReducer, useEffect } from 'react'
import PerformanceLevelsTable from './table'
import NewPerformanceLevelForm from './new-form'

const HOST = process.env.REACT_APP_D

const API = {
	async addPerformanceLevel(perfmLvl) {
		console.group(`API - addPerformanceLevel()`)
		
		const res = await fetch(`${HOST}/v2/performance-levels`, {
			method: 'post',
	        headers: {
	            'Content-Type': 'Application/json'
	        },
	        body: JSON.stringify({ performanceLevel: perfmLvl })
        })

        const json = await res.json()
        console.log(`resived data is: ${JSON.stringify(json, null, 4)}`)
		console.groupEnd()
        return json
	},
	
	async getPerformanceLevels() {
		console.group(`API - getPerformanceLevel()`)
		
		const res = await fetch(`${HOST}/v2/performance-levels`, {
			method: 'get'
        })

        const json = await res.json()
        console.log(`resived data is: ${JSON.stringify(json, null, 4)}`)
		console.groupEnd()
        return json.performanceLevels
	},

	async deletePerformanceLevel({ id }) {
		console.group(`API - deletePerformanceLevel()`)
		
		const res = await fetch(`${HOST}/v2/performance-levels/${id}`,
			{
				method: 'delete'
			})

		const json = await res.json()
		console.log(`resived data: ${JSON.stringify(json, null, 4)}`)
		console.groupEnd()
		
		return json
	}				  
}

const initialState = {
	performanceLevels: [
		{
			id: 10000,
			level: 1,
			ranges: [
				{
					order: 1,
					slp: 50,
					percentage: {
						scholar: 1,
						manager: 1,
						investor: 98
					},
				},
				{
					order: 2,
					slp: 60,
					percentage: {
						scholar: 1,
						manager: 1,
						investor: 98
					},
				},
				{
					order: 3,
					slp: 150,
					percentage: {
						scholar: 1,
						manager: 1,
						investor: 98
					}
				}
			],
		},
	],

	mode: 'table',

	newPerfmLvl: null,
	delete: null
}

const reducer = (state, action) => {
	const { type, payload } = action
	console.log(`Action is: ${JSON.stringify(action, null, 4)}`)

	let newState
	let perfmLvl
	switch(type){
		case 'change-mode':
			newState = {
				...state,
				mode: 'new'
			}
			
			return newState
			break

		case 'add':
			perfmLvl = payload
			console.log(`perfmLvl: ${JSON.stringify(perfmLvl, null, 4)}`)
			newState = {
				...state,
				mode: 'table'
			}

			if(perfmLvl) {
				newState.newPerfmLvl = perfmLvl
			}

			return newState
			break
		
		case 'delete':
			perfmLvl = payload
			console.log(`Delete: ${perfmLvl.id}`)

			newState = {
				...state,
				delete: perfmLvl
			}

			return newState
			break

		case 'update':
			console.log(`the performanceLevels are: ${JSON.stringify(payload, null, 4)}`)
			return {
				...state,
				performanceLevels: payload
			}
			break
		
		default:
			throw new Error(`Unknow action: ${type}`)
			break
	}	
}

export default function PerformanceLevels(props) {
	const [ state, dispatch ] = useReducer(reducer, initialState)
	const { 
		mode,
		performanceLevels,
	} = state

	const updateData = async () => {
		const perfmLvls = await API.getPerformanceLevels()
		dispatch({ type: 'update', payload: perfmLvls })
	}

	useEffect(() => {
		updateData()
	}, [])

	useEffect(() => {
		const { newPerfmLvl } = state
		
		if(newPerfmLvl) {
			API.addPerformanceLevel(newPerfmLvl)
				.then( _ => updateData())
		}
	}, [state.newPerfmLvl])

	useEffect(() => {
		const perfmLvl = state.delete

		if (perfmLvl) {
			API.deletePerformanceLevel(perfmLvl)
				.then( _ => updateData())
		}
	}, [state.delete])

	let view
	console.log(mode)
	switch(mode){
		case 'table':
			view = <PerformanceLevelsTable
						performanceLevels={performanceLevels}
						onAction={dispatch}
					/>
			break

		case 'new':
			view = <NewPerformanceLevelForm
						onAction={dispatch}/>
			break
		
		
	}

	return (
		<div>
			{ view }
		</div>
		)
}