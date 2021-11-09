import { useState, useEffect } from 'react'
import PerformanceLevelForm from './components/performance-level-form'
import PerformanceLevelsTable from './components/performance-levels-table'

const HOST = 'http://localhost:4000'

function App() {
    let [ performanceLevels, setPerformanceLevel ] = useState([])

    const handleNewLevel = async (newPerformanceLevel) => {
        console.log('App - handleNewLevel')

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

        setPerformanceLevel(json.performanceLevels)

    }

    const updateData = async () => {
        let res = await fetch(`${HOST}/performance-levels`, {
            method: 'get'
        })

        let json = await res.json()

        setPerformanceLevel(json.performanceLevels)

    }

    useEffect(() => {
        updateData()
    }, [])

  return (
    <div>
        <PerformanceLevelForm onSubmit={ handleNewLevel }/>
        <PerformanceLevelsTable data= { performanceLevels }/>
    </div>
  );
}

export default App;
