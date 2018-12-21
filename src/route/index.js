import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Weather from '../containers/weather'
import Todos from '../containers/todos'

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Weather} />
      <Route exact path='/todos' component={Todos} />
    </Switch>
  </HashRouter>
)

export default BasicRoute