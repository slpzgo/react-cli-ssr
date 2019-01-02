import React, { Component } from 'react'

export default class TodosList extends Component {
  constructor (props) {
    super(props)
  }
  kk () {
    console.log(1)
  }

  render () {
    return (
      <div>
        <button onClick={ this.kk.bind(this) }>添加todos</button>
        <ul>
          {
            this.props.todos.map((v, i) => {
              return <li key={i}>{ v.id }</li>
            })
          }
        </ul>
      </div>
    )
  }
}
