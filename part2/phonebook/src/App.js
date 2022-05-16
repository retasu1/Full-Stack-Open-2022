import { useState } from 'react'

const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
  
  const peopleToShow = filterName === '' ?
  persons : persons.filter(person => person.name === filterName)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSubmit={setFilterName} value={filterName} onChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} value1={newName} value2={newNumber} onChange1={handlePersonChange} onChange2={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={peopleToShow}/>

    </div>
  )
}

export default App