import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Action from '../store/actions'
import Weather from '../containers/weather'
import Todos from '../containers/todos'

const BasicRoute = () => (
  <Switch>
    <Route exact path='/' component={Weather} fetch={Action.getWeather} />
    <Route exact path='/todos' component={Todos} />
  </Switch>
)

export default BasicRoute