import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss'


const PageContent = () => {
  const todoList = useSelector(state => state.todo.todoList);
  const todos = [...todoList];
  const sortedTodoList = todos.sort((a,b) => new Date(b.time) - new Date(a.time))
  const filter = useSelector((state) => state.todo.filterStatus)
  const filteredTodoList = sortedTodoList.filter((element) => {
    if (filter === 'all') {
        return true;
    } else {
        return element.status === filter;
    }
  })
  return (
    <div className={styles.content__wrapper}>
        {filteredTodoList && filteredTodoList.length > 0 
        ? filteredTodoList.map((element) => {
            return <TodoItem todo={element} key={element.id}/>
        }) 
        : 'not here'}
    </div>
  )
}

export default PageContent 