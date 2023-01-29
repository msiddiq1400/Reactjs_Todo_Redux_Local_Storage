import React from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import { format } from 'date-fns'

const TodoItem = ({todo}) => {
    console.log(todo)
  return (
    <div className={styles.item}>
        <div className={styles.todoDetails}>
            <div className={styles.text}>
                <p 
                    className={getClasses([styles.todoText, todo.status === 'complete' && styles['todoText--completed']])}>
                {todo.title}
                </p>
                <p className={styles.time}>{format(new Date(todo.time), 'p, MM/dd/yyy')}</p>
            </div>
        </div>
    </div>
  )
}

export default TodoItem