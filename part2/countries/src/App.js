import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, apiKey}) => {
  const [weather, setWeather] = useState({
    "main":{"temp":0},
    "wind":{"speed":0},
    "weather":[{"icon":"01d"}]
  })

  console.log(country);

  let lat = country.latlng[0]
  let lon = country.latlng[1]

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])

  console.log(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)

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

      <h1>Weather in {country.capital[0]}</h1>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const CountryName = ({country, apiKey}) => {
  const [showCountry, setShowCountry] = useState(false)

  return(
    <div>
      {country.name.common} 
      <button onClick={() => setShowCountry(!showCountry)}>
        {showCountry? 'hide' : 'show'}
      </button>
      {showCountry? 
      <Country country={country} apiKey={apiKey}/>:''}
    </div>
  )
}

const Countries = ({countries, apiKey}) => {
  //console.log(countries[0].name.common)
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <CountryName key={country.name.common} country={country} apiKey={apiKey}/>)}
      </div>
    )
  } else if (countries.length === 1) {
    //console.log(countries[0])
    return (
      <Country country={countries[0]} apiKey={apiKey}/>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

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
      <Countries countries={filteredCountries} apiKey={api_key}/>
    </div>

  )
}

export default App;
