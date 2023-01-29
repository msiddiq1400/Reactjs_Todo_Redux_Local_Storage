import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';


const PageContent = () => {
  const todoList = useSelector(state => state.todo.todoList);
  const todos = [...todoList];
  const sortedTodoList = todos.sort((a,b) => new Date(b.time) - new Date(a.time))
  console.log(sortedTodoList)

  return (
    <div>
        {sortedTodoList && sortedTodoList.length > 0 
        ? sortedTodoList.map((element) => {
            return <TodoItem todo={element} key={element.id}/>
        }) 
        : 'not here'}
    </div>
  )
}

export default PageContent 