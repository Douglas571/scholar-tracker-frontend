import { useState, useEffect } from 'react'
import PerformanceLevelForm from './components/performance-level-form'
import PerformanceLevelsTable from './components/performance-levels-table'

const HOST = 'http://localhost:4000'

function App() {
    let [ performanceLevels, setPerformanceLevel ] = useState([])
    let [ nextMinSLP, setNextMinSLP ] = useState(0)

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

        updateData()

    }

    const handleDeleteLevel = async (id) => {
        console.log('delete level: ', id)
        console.log(id)

        let res = await fetch(`${HOST}/performance-levels/${id}`, {
            method: 'delete'
        })

        let json = await res.json()
        console.log('response: ', json)
        updateData()
    }

    const updateData = async () => {
        let res = await fetch(`${HOST}/performance-levels`, {
            method: 'get'
        })

        let json = await res.json()

        let newNextMinSLP = json.nextMinSLP
        setPerformanceLevel(json.performanceLevels)
        setNextMinSLP(json.nextMinSLP)

        console.log(json)
        
        //console.log(performanceLevels)

        //console.log('newNextMinSLP:', newNextMinSLP, typeof newNextMinSLP)
        //console.log(`nextMinSLP: ${nextMinSLP}, ${typeof nextMinSLP}`)
    }

    useEffect(() => {
        updateData()
    }, [])

  return (
    <div>
        <PerformanceLevelForm onSubmit={ handleNewLevel } nextMinSLP={ nextMinSLP }/>
        <PerformanceLevelsTable data= { performanceLevels } onDelete={ handleDeleteLevel }/>
    </div>
  );
}

export default App;
