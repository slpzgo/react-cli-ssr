const initialState = {
  results: 1,
  city: ''
}

const weather = (state = initialState, action) => {
  let stateCopy = { ...state }
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
