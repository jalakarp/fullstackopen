import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [points, setPoints] = useState(0)

  const goodPoints = 1
  const badPoints = -1
  const neutralPoints = 0

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedTotal = total + 1
    setTotal(updatedTotal)

    const updatedPoints = points + goodPoints
    setPoints(updatedPoints)

  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedTotal = total + 1
    setTotal(updatedTotal)

    const updatedPoints = points + badPoints
    setPoints(updatedPoints)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedTotal = total + 1
    setTotal(updatedTotal)

    const updatedPoints = points + neutralPoints
    setPoints(updatedPoints)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics 
        countGood={good} 
        countNeutral={neutral}
        countBad={bad}
        countTotal={total}
        pointsAverage={(points / total).toFixed(2)}
        positive={((good / total) * 100).toFixed(1)}
       />
    </div>
  )
}

const Statistics = (props) => {
  if((props.countTotal !== 0)) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.countGood}/>
          <StatisticLine text="bad" value={props.countBad}/>
          <StatisticLine text="neutral" value={props.countNeutral}/>
          <StatisticLine text="all" value={props.countTotal}/>
          <StatisticLine text="average" value={props.pointsAverage}/>
          <StatisticLine text="positive" value={props.positive} unit="%"/>
        </tbody>
        
      </table>
        
      
    )
  } 
  else {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
    
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.unit}</td>
    </tr>
  );
}
  

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App