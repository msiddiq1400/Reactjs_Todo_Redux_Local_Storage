import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss'
import { AnimatePresence, motion } from 'framer-motion';

const containerVariant = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
};

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1}
};

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
  });

  return (
    <motion.div 
        className={styles.content__wrapper}
        variants={containerVariant}
        initial='hidden'
        animate='visible'
    >   
        <AnimatePresence>
            {filteredTodoList && filteredTodoList.length > 0 
            ? filteredTodoList.map((element) => {
                return <TodoItem todo={element} key={element.id}/>
            })
            : <motion.p 
                className={styles.emptyText}
                variants={child}
            >
                no todo here
            </motion.p>}
        </AnimatePresence>
    </motion.div>
  )
}

export default PageContent 