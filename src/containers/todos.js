import { connect } from 'react-redux'
import { addTodo } from '../store/actions'
import TodosList from '../components/TodosList'

const mapStateToProps = state => ({ todos: state.todos })

export default connect(mapStateToProps, { addTodo })(TodosList)