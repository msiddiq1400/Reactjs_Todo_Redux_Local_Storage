import React, { useEffect, useState } from 'react'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import { format } from 'date-fns'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import { toast } from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const TodoItem = ({todo}) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    if(todo.status === 'complete') {
        setChecked(true)
    } else {
        setChecked(false)
    }
  }, [todo.status])

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
    toast.success('Todo deleted successfully')
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
  }

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete'
    }))
  }

  return (
    <>
    <div className={styles.item}>
        <div className={styles.todoDetails}>
            <CheckButton checked={checked} setChecked={setChecked} handleCheck={handleCheck}/>
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