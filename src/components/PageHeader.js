import React, { useState } from 'react'
import Button from './Button'
import SelectButton from './SelectButton'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterStatus } from '../slices/todoSlice'

const PageHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus)
  const dispatch = useDispatch();

  const updateFilter = (event) => {
    dispatch(updateFilterStatus(event.target.value))
  }

  return (
    <div>
        <div className={styles.appHeader}>
            <Button 
                variant='primary'
                onClick={() => setModalOpen(true)}
            >
                Add Task 
            </Button>
            <SelectButton value={filterStatus} onChange={updateFilter}>
                <option value='all'>ALL</option>
                <option value='incomplete'>Incomplete</option>
                <option value='complete'>Complete</option>
            </SelectButton>
        </div>
        <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default PageHeader