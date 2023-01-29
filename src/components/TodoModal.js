import React, { useEffect, useState } from 'react'
import styles from '../styles/modules/modal.module.scss'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import {v4 as uuid} from 'uuid';
import { toast } from 'react-hot-toast';

const TodoModal = ({modalOpen,setModalOpen, type, todo}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if(type === 'update' && todo) {
        setTitle(todo.title)
        setStatus(todo.status)
    } else {
        setTitle('')
        setStatus('incomplete')
    }
  }, [type, todo, modalOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title) {
        toast.error('Title cannot be empty')
        return;
    }
    if(title && status) {
        if(type === 'add') {
            dispatch(addTodo({
                id: uuid(),
                title,
                status,
                time: new Date().toString()
            }))
            toast.success('Task Added Successfully');
        } else if(type === 'update') {
            if(title !== todo.title || status !== todo.status) {
                dispatch(updateTodo({
                    ...todo,
                    title,
                    status,
                    time: new Date().toString()
                }))
            }
        }
        setModalOpen(false)
    } else {
        toast.error('Title should not be empty')
    }
  }

  return ( 
    <div>    
        {modalOpen && 
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div 
                    className={styles.closeButton} 
                    onClick={() => setModalOpen(false)} 
                    onKeyDown={() => setModalOpen(false)}
                    tabIndex={0}
                    role="button"
                >
                    <AiOutlineCloseSquare/>
                </div>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className={styles.formTitle}>{type === 'update' ? 'Update Task' : 'Add Task'}</h1>
                    <label htmlFor='title'>
                        Title
                        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                    <label htmlFor='status'>
                        Status
                        <select name='status' id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value='complete'>Complete</option>
                            <option value='incomplete'>Incomplete</option>
                        </select>
                    </label>
                    <div className={styles.buttonContainer}>
                        <Button type='submit' variant='primary'>{type === 'update' ? 'Update Task' : 'Add Task'}</Button>
                        <Button type='button' variant='secondary' onClick={() => setModalOpen(false)} onKeyDown={() => setModalOpen(false)} >Cancel</Button>
                    </div>
                </form>
                </div>
            </div>
        }
    </div>
  )
}

export default TodoModal