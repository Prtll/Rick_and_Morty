import React from 'react'
import './styles/location.css'

const LocationInfo = ({location}) => {

 
  
  return (
    <article className='card__info'>
      <h2 className='card__info--title'>{location?.name}</h2>
      <ul className='card__info--list'>
        <li><span className='card__info--span' >Type</span>{location?.type}</li>
        <li><span className='card__info--span' >Dimension</span>{location?.dimension}</li>
        <li><span className='card__info--span' >Population</span>{location?.residents.length}</li>
      </ul>
    </article>
  )
}

export default LocationInfo