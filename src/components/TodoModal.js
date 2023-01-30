import React, { useEffect, useState } from 'react'
import styles from '../styles/modules/modal.module.scss'
import { AiOutlineCloseSquare } from 'react-icons/ai';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import {v4 as uuid} from 'uuid';
import { toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
};

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
    <AnimatePresence>
        {modalOpen && 
        <motion.div className={styles.wrapper} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div className={styles.container} variants={dropIn} initial="hidden" animate="visible" exit="exit">
                <motion.div 
                    className={styles.closeButton} 
                    onClick={() => setModalOpen(false)} 
                    onKeyDown={() => setModalOpen(false)}
                    tabIndex={0}
                    role="button"
                    initial={{top: 40, opacity: 0}}
                    animate={{top: -10, opacity: 1}}
                    exit={{top: 40, opacity: 0}}
                >
                    <AiOutlineCloseSquare/>
                </motion.div>
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
                </motion.div>
            </motion.div>
        }
    </AnimatePresence>
  )
}

export default TodoModal