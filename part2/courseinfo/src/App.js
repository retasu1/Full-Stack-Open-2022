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

const Courses = ({courses}) => {
  return(
    <>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App;
