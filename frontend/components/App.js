import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: '',
    displayCompleted: true,
  }
  onTodoInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInput: value })
  }
  resetForm = () => this.setState({ ...this.state, todoInput: '' })
  setAxiosError = err => this.setState({ ...this.state, error: err.response.data.message })

  postTodo = () => {
    axios.post(URL, { name: this.state.todoInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setAxiosError)
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postTodo();
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosError)
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(todo => {
            if (todo.id !== id) return todo
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosError)

  }
  toggleDisplayed = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
          <TodoList 
          todos={this.state.todos}
          displayCompleted = {this.state.displayCompleted}
          toggleCompleted = {this.toggleCompleted}
          />
          <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          todoInput={this.state.todoInput}
          onTodoInputChange={this.onTodoInputChange}
          toggleDisplayed={this.toggleDisplayed}
          displayCompleted={this.state.displayCompleted}
          />
      </div>
    )
  }
}
