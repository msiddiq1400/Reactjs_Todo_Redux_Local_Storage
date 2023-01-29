import React from 'react'
import style from '../styles/modules/button.module.scss'
import { getClasses } from '../utils/getClasses'

const SelectButton = ({children, ...rest}) => {
  return (
    <select 
        className={getClasses([style.button, style.button__select])} 
        {...rest}
    >
        {children}
    </select>
  )
}

export default SelectButton