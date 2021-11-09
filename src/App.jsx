import { useState } from 'react'
import PerformanceLevelForm from './components/performance-level-form'
import PerformanceLevelsTable from './components/performance-levels-table'

function App() {
  const handleNewLevel = async (newPerformanceLevel) => {
    console.log('App - handleNewLevel')

    const payload = { performanceLevel: newPerformanceLevel}

    let res = await fetch('http://localhost:4000/performance-levels', {
      method: 'post',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(payload)
    })

    console.log('response:')
    let json = await res.json()

    console.log(json)
  }

  return (
    <div>
      <PerformanceLevelForm onSubmit={ handleNewLevel }/>
      <PerformanceLevelsTable/>
    </div>
  );
}

export default App;
