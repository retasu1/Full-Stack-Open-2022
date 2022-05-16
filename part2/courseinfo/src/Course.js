import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({parts}) => {
  //console.log(parts)
  const total = parts.map(part => part.exercises).reduce((partialSum, a) => partialSum + a)
  //console.log(total)
  return(
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({ part }) => {
  //console.log(part)
  return(
    <p>
      {part.name} {part.exercises}
    </p>     
  )
 
}

const Content = ({ parts }) => {
  //console.log('parts:',parts)
  return(
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}      
    </>    
  )
}


const Course = ({course}) => {
  //console.log(course)
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/>     
    </div>

  )
}

export default Course