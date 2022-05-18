import { useState, useEffect } from 'react'
import axios from 'axios'
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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const handlePersonDelete = (name) => {
    const id = persons.filter(person => person.name === name)[0].id
    console.log(id);
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
      <h2>Phonebook</h2>
      <Filter onSubmit={setFilterName} value={filterName} onChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} value1={newName} value2={newNumber} onChange1={handlePersonChange} onChange2={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={peopleToShow} onClick={handlePersonDelete}/>

    </div>
  )
}

export default App