import React from 'react'
import './Weather.css'

const Weather = () => {
  return (
    <div className='weather'>
      <div className='search'>
        <input type='text' placeholder='Search' />
        <img src='./search-icon.svg' alt='Search' />
        </div>
    </div>
  )
}

export default Weather
