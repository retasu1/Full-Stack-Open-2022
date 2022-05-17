import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        area {country.area}
      </p>
      <b>languages:</b>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => 
          <li>{value}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.name.common + ' flag'}></img>
    </div>
  )
}

const CountryName = ({country}) => {
  const [showCountry, setShowCountry] = useState(false)

  return(
    <div>
      {country.name.common} 
      <button onClick={() => setShowCountry(!showCountry)}>
        {showCountry? 'hide' : 'show'}
      </button>
      {showCountry? 
      <Country country={country}/>:''}
    </div>
  )
}

const Countries = ({countries}) => {
  //console.log(countries[0].name.common)
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <CountryName country={country} />)}
      </div>
    )
  } else if (countries.length === 1) {
    //console.log(countries[0])
    return (
      <Country country={countries[0]}/>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const regexp = new RegExp(filter, 'i')
  const filteredCountries = filter === '' ?
    countries : countries.filter(x => regexp.test(x.name.common))

  return (
    <div>
      <form onSubmit={setFilter}>
        <div>
          find countries <input value={filter} onChange={handleFilterChange}/>
        </div>
      </form>
      <Countries countries={filteredCountries}/>
    </div>

  )
}

export default App;
