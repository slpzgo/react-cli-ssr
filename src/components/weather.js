import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Weather extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    weather: PropTypes.number
  }

  render () {
    let content
    const { results, city } = this.props.weather
    if (results.length) {
      content = (<div>
        <section className='city-weather-info'>
          {
            results.map((v, i) => {
              return (<div key={i}>
                {
                  v.weather_data.map((w, j) => {
                    return (
                      <div key={j}>
                        <div className='city-weather-line'>
                          <span className='city-weather-date'>{ w.date }</span>
                          <span className='city-weather-temperature'>{ w.temperature }</span>
                        </div>
                        <div className='city-weather-line'>
                          <img className='city-weather-img' src={ w.dayPictureUrl } />
                          <span className='city-weather-weather'>{ w.weather }</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>)
            })
          }
        </section>
      </div>)
    }

    return (
      <div>
        <header>
          <span className='header-city'>{ city }</span>
        </header>
        <section className='temp-info'>
          { content }
        </section>
      </div>
    )
  }
}

export default Weather