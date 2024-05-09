import { useState, useEffect } from 'react'
import countries from './services/countries'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [country, setCountry] = useState(null)
  const [input, setInput] = useState(null)
  const [filtered, setFiltered] = useState([])
  const [found, setFound] = useState(false)

  useEffect(() => {
    console.log('Getting countries Data');
    countries
      .getAll()
      .then(countriesData => {
        setCountryData(countriesData)
        console.log(countriesData);
      })
      
  }, [])

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const keyFilter = (searchKey) => function(country) {
    return (country.name.common.toLowerCase() === searchKey);
  }

  const handleSearch = (event) => {
    if(event.target.value.length > 4) {
      setInput(event.target.value.toLowerCase())
      const localSearchKey = event.target.value.toLowerCase()
      const found = countryData.filter(keyFilter(localSearchKey))
      setFiltered(found)
      console.log(found);
    } else {
      setFiltered([])
    }
  }



  const getCountry = (country) => {
    console.log('Searching country', country);
    countries
      .search(country)
      .then(countryData => {
        setCountry(countryData)
        setFound(true)
        console.log(countryData);
      })
  }

  const getResults = () => {
    if(filtered !== null && filtered.length <= 10) {
      return filtered.map(country => <p key={country.population}> {country.name.common} </p>)
    } else {
      return <h3>Be more specific</h3>
    } 
  }


  return (
    <div>
      <h1>Countries</h1>
      <div>
          find countries: <input onInput={handleSearch} name="name input" title="name input" />
      </div>
      <div>
        <Results getCountry={getCountry} filtered={filtered} country={country} found={found} setFound={setFound}></Results>
      </div>

    </div>
    
  )
}

const Results = ({filtered, getCountry, found, country, setFound}) => {
  if(filtered.length > 1 && filtered.length <= 10) {
    setFound(false)
    return filtered.map(country => <p key={country.population}> {country.name.common} </p>)
  } else if(filtered.length == 1) {
    if(found == false) {
      getCountry(filtered[0].name.common)
    }
    return <div><pre>{JSON.stringify(country, null, 2) }</pre></div>
    
  } else {
    setFound(false)
    return <p>Too many, specify another filter</p>
  }
}

export default App
