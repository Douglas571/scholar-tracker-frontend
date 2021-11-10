import { useState, useEffect } from 'react'

import PerformanceLevelForm from './components/performance-level-form'
import PerformanceLevelsTable from './components/performance-levels-table'

import ScholarForm from './components/scholar-form'
import ScholarTable from './components/scholar-table'

const HOST = process.env.REACT_APP_D

function App() {
    let [ performanceLevels, setPerformanceLevel ] = useState([])
    let [ scholars, setScholars ] = useState([])
    let [ nextMinSLP, setNextMinSLP ] = useState(0)

    const updateData = async () => {
        let res = await fetch(`${HOST}/performance-levels`, {
            method: 'get'
        })

        let json = await res.json()

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

        console.groupEnd(json)

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

    function topDownSort(property) {
        return (a, b) => {
            if (a[property] === b[property]) {
                return 0
            } else if (a[property] > b[property]) {
                return -1
            } else {
                return 1
            }
        }
    }

    function downTopSort(property) {
        return (a, b) => {
            if (a[property] === b[property]) {
                return 0
            } else if (a[property] > b[property]) {
                return 1
            } else {
                return -1
            }
        }
    }

    let [ sortTopDown, setSortTopDown ] = useState(false)
    let [ sortBy, setSortBy ] = useState('')

    const handleScholarsSort = (by) => {
        let newScholars

        setSortBy(by)

        if (sortTopDown) {
            console.log('sort', by, 'top-down ˄')
            newScholars = scholars.sort(topDownSort(by))
            setSortTopDown(false)
        } else {
            console.log('sort', by, 'down-top ˅')
            newScholars = scholars.sort(downTopSort(by))
            setSortTopDown(true)
        }

        setScholars([...newScholars])

    }


  return (
    <div id='main'>
        <h1>Domain: { HOST }</h1>
        <PerformanceLevelForm onSubmit={ handleNewLevel } nextMinSLP={ nextMinSLP }/>
        <PerformanceLevelsTable data= { performanceLevels } onDelete={ handleDeleteLevel }/>

        <ScholarForm onSubmit={ handleNewScholar }/>
        <ScholarTable data={ scholars } onSort={ handleScholarsSort } sortTopDown={ sortTopDown } sortBy={ sortBy }/>
    </div>
  );
}

export default App;
