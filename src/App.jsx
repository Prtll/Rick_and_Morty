
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import './components/styles/search.css'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {

  const [location, setLocation] = useState()
  const [searchImput, setSearchImput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)



  useEffect(() => {
    let id = getRandomNumber()
    if (searchImput) {
      id = searchImput
    }

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchImput])

  const handleSubmit = e => {
    e.preventDefault()
    setSearchImput(e.target.idLocation.value)
  }

  const handleChange = e => {

    if (e.target.value === '') {
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))

    }
  }

  return (
    <div className="App">
      <header className='header'>
        <img className='header__bg' src="https://www.todofondos.net/wp-content/uploads/24-fondos-de-pantalla-de-rick-and-morty-portal-wallpaperboat.-wallpaper-hd-1080p-de-rick-y-morty.jpg" alt="background" />
      </header>
      <section className='search__content'>
        <h1 className= 'search__title'>Rick And Morty</h1>
        <form className='search__form' onSubmit={handleSubmit}>
          <input className='search__input'
            id='idLocation'
            placeholder='1 to 126 location'
            type="text"
            onChange={handleChange}
          />
          <button className='search__btn'>Search</button>
          <FilterList
            suggestedList={suggestedList}
            setSearchImput={setSearchImput}
          />
        </form>
      </section>

      {
        hasError ?
          <ErrorScreen />
          :
          <>
            <LocationInfo location={location} />
            <div className='card--container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }

    </div>
  )
}

export default App
