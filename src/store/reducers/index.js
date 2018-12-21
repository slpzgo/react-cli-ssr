import { combineReducers } from 'redux'
import todos from './todos'
import weather from './weather'

export default combineReducers({
  todos,
  weather
})
