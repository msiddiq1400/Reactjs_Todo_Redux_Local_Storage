import React, { useState } from 'react'
import Button from './Button'
import SelectButton from './SelectButton'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'

const PageHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
        <div className={styles.appHeader}>
            <Button 
                variant='primary'
                onClick={() => setModalOpen(true)}
            >
                Add Task 
            </Button>
            <SelectButton>
                <option value='all'>ALL</option>
                <option value='incomplete'>Incomplete</option>
                <option value='complete'>Complete</option>
            </SelectButton>
        </div>
        <TodoModal modalOpen={modalOpen} toggleModalVisibility={setModalOpen}/>
    </div>
  )
}

export default PageHeader