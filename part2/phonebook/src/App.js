import { useState, useEffect } from 'react'
import peopleService from './services/persons'

const Person = ({name, number, onClick}) => 
  <div>
    {name} {number} 
    <button onClick={onClick}>
        delete
    </button>
  </div>

const Persons = ({persons, onClick}) => {
  return(
    <div>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number} onClick={() => onClick(person.name)}/>)}
    </div>
  )
}

const Filter = ({onSubmit, value, onChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        filter shown with <input value={value} onChange={onChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({onSubmit, value1, onChange1, value2, onChange2}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={value1} onChange={onChange1}/>
      </div>
      <div>
        number: <input value={value2} onChange={onChange2}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>     
  )
}

const Success = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber      
    }

    setNewName('')
    setNewNumber('')

    const existingPerson = persons.find(p => p.name === newPerson.name)

    if (existingPerson) {
      const changedNumber = {...existingPerson, number:newNumber}
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      
      if (ok) {
        peopleService
          .update(existingPerson.id, {changedNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setSuccessMessage(`${newName} number changed`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)})
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          return
      }
    } 

    peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setSuccessMessage(`${newName} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const handlePersonDelete = (name) => {
    const id = persons.filter(person => person.name === name)[0].id
    //console.log(id);
    if (window.confirm(name + ' would be deleted!')) {
      console.log(name + ' deleted')   
      peopleService
        .remove(id)
        .then(
          peopleService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
        )
    } else {
      console.log('deletion cancelled');
    }
  }
  
  const peopleToShow = filterName === '' ?
  persons : persons.filter(person => person.name === filterName)

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={successMessage}/>
      <Error message={errorMessage}/>
      <Filter onSubmit={setFilterName} value={filterName} onChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} value1={newName} value2={newNumber} onChange1={handlePersonChange} onChange2={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={peopleToShow} onClick={handlePersonDelete}/>

    </div>
  )
}

export default App