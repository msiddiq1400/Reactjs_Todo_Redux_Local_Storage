import React, { useState } from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import { format } from 'date-fns'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import { toast } from 'react-hot-toast';
import TodoModal from './TodoModal';

const TodoItem = ({todo}) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
    toast.success('Todo deleted successfully')
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
  }

  return (
    <>
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
        <div className={styles.todoActions}>
            <div className={styles.icon} onClick={() => handleDelete()} onKeyDown={() => handleDelete()} role='button' tabIndex={0}>
                <AiFillDelete />
            </div>
            <div className={styles.icon} onClick={() => handleUpdate()} onKeyDown={() => handleUpdate()} role='button' tabIndex={0}>
                <AiFillEdit />
            </div>
        </div>
    </div>
    <TodoModal type='update' modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} todo={todo}/>
    </>
  )
}

export default TodoItem