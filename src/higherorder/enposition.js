import React, { Component } from 'React'

export default ComposedComponent => class Enhance extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { getPosition, getWeather } = this.props
    getPosition().then(res => {
      getWeather(res.data.data.content.address_detail.city)
    })
  }

  render () {
    return <ComposedComponent {...this.props} />
  }
}