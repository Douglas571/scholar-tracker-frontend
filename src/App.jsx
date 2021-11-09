import { useState, useEffect } from 'react'

import PerformanceLevelForm from './components/performance-level-form'
import PerformanceLevelsTable from './components/performance-levels-table'

import ScholarForm from './components/scholar-form'
import ScholarTable from './components/scholar-table'

const HOST = 'http://localhost:4000'

function App() {
    let [ performanceLevels, setPerformanceLevel ] = useState([])
    let [ scholars, setScholars ] = useState([])
    let [ nextMinSLP, setNextMinSLP ] = useState(0)

    const updateData = async () => {
        let res = await fetch(`${HOST}/performance-levels`, {
            method: 'get'
        })

        let json = await res.json()

        let newNextMinSLP = json.nextMinSLP
        setPerformanceLevel(json.performanceLevels)
        setNextMinSLP(json.nextMinSLP)

        res = await fetch(`${HOST}/scholars`, {
            method: 'get'
        })

        json = await res.json()

        console.log(json)

        setScholars(json.scholars)
    }

    useEffect(() => {
        updateData()
    }, [])

    const handleNewLevel = async (newPerformanceLevel) => {
        console.group('App - handleNewLevel')

        const payload = { performanceLevel: newPerformanceLevel}

        let res = await fetch(`${HOST}/performance-levels`, {
          method: 'post',
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(payload)
        })

        console.log('response:')
        let json = await res.json()

        console.groupEnd()

        updateData()

    }

    const handleDeleteLevel = async (id) => {
        console.group('delete level: ', id)
        console.log(id)

        let res = await fetch(`${HOST}/performance-levels/${id}`, {
            method: 'delete'
        })

        let json = await res.json()
        console.log('response: ', json)
        console.groupEnd()

        updateData()
    }

    const handleNewScholar = async (newScholar) => {
        console.group('App - handleNewScholar')
        console.log(newScholar)

        const res = await fetch(`${HOST}/scholars`, {
            method: 'post',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ scholar: newScholar })
        })

        const json = await res.json()

        console.log(json)
        console.groupEnd()

        updateData()
    }


  return (
    <div>
        <PerformanceLevelForm onSubmit={ handleNewLevel } nextMinSLP={ nextMinSLP }/>
        <PerformanceLevelsTable data= { performanceLevels } onDelete={ handleDeleteLevel }/>

        <ScholarForm onSubmit={ handleNewScholar }/>
        <ScholarTable data={ scholars }/>
    </div>
  );
}

export default App;
