import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from '../views/home'
import Detail from '../views/detail'

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/detail' component={Detail} />
    </Switch>
  </HashRouter>
)

export default BasicRoute