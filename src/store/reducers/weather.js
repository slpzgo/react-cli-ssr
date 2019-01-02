const initialState = {
  results: [],
  city: ''
}

const weather = (state = initialState, action) => {
  let stateCopy = { ...state }
  if (typeof action.data === 'string') action.data = JSON.parse(action.data)
  switch (action.type) {
    case 'GET_WEATHER_SUCCESS':
      stateCopy.results = action.data.results
      break
    case 'GET_POSITION_SUCCESS':
      stateCopy.city = action.data.data.content.address_detail.city
      break
    default:
      return state
  }
  return stateCopy
}

export default weather
