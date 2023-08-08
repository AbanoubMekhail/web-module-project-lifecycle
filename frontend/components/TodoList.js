import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
      <h1>My Todos:</h1>
      {
        this.props.todos.reduce((acc, todo) => {
          if (this.props.displayCompleted || !todo.completed) return acc.concat(
            <Todo 
            key={todo.id}
            toggleCompleted = {this.props.toggleCompleted}
            todo = {todo}
            />
          )
          return acc
        }, [])
        //return 
      }
    </div>
    )
  }
}
