import React, { Component } from 'react'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'detail'
    }
  }

  submitHandle () {
    this.beforeSubmitHandle()
    console.log('this is click handle!')
  }

  beforeSubmitHandle () {
    this.setState({
      name: 'here'
    })
    console.log('will do handle')
  }

  componentWillMount () {
    console.log('mounted')
  }

  render () {
    return (
      <div>
        <a onClick={ this.submitHandle.bind(this) }>{`去${this.state.name}`}</a>
      </div>
    )
  }
}
