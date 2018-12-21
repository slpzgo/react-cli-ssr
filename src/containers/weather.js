import { connect } from 'react-redux'
import { getWeather, getPosition } from '../store/actions'
import EnPosition from '../higherorder/enposition'
import Weather from '../components/weather'

const mapStateToProps = state => ({ weather: state.weather || {} })

export default connect(mapStateToProps, { getWeather, getPosition })(EnPosition(Weather))
