import { connect } from 'react-redux'
import { getWeather } from '../store/actions'
import EnPosition from '../higherorder/enposition'
import Weather from '../components/weather'

const mapStateToProps = state => ({ weather: state.weather || {} })
export default connect(mapStateToProps, { getWeather })(EnPosition(Weather))
