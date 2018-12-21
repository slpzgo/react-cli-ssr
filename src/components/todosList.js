import React, { Component } from 'react'

export default class TodosList extends Component {
  render () {
    return (
      <div>
        <button onClick={ this.props.addTodo }>添加todos</button>
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
