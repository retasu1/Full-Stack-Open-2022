import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Title = ({title}) => <h1>{title}</h1>

const StatisticLine = ({text, value, unit}) => <tr><td>{text}</td><td>{value}{unit}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  //console.log(good, neutral, bad)
  let sum = good + (0*neutral) + (-1*bad)
  let n = good + neutral + bad
  let average = sum/n
  let positive = good/n

  if (n === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} /> 
        <StatisticLine text="bad" value={bad} /> 
        <StatisticLine text="all" value={n} /> 
        <StatisticLine text="average" value={average} /> 
        <StatisticLine text="positive" value={positive} unit="%"/>        
      </tbody>
    
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title={'give feedback'} />
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <Title title={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App