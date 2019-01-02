import Fly from '../../assets/js/fly'

let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const APIS = (api, params) => {
  return async dispatch => {
    try {
      const data = await Fly({ api, params })
      return dispatch({
        type: `GET_${api.toUpperCase()}_SUCCESS`,
        data
      })
    } catch (err) {
      return dispatch({
        type: `GET_${api.toUpperCase()}_FAIL`,
        err
      })
    }
  }
}

export const getWeather = city => {
  return dispatch => {
    return dispatch(getPosition()).then(res => {
      return dispatch(APIS('weather', { city: res.data.data.content.address_detail.city }))
    })
  }
  // return APIS('weather', { city })
}

export const getPosition = () => {
  return APIS('position')
}