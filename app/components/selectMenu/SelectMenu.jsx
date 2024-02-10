"use client"
import Image from 'next/image'
import styles from './selectMenu.module.css'
import { useState } from 'react'
import { categoriesDump, menuCategoryDumb } from '@/data/categoryDump'

const SelectMenu = ({ label, options, setSelectValue }) => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleValue = (e) => {
    e.target.dataset.value
    setValue(e.target.dataset.value)
    setSelectValue && setSelectValue(e.target.dataset.value)
    toggleSelect(false)
  }

  const toggleSelect = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.selectMenu} data-select='selectMenu' >

      <label htmlFor="selectMenuInput">{label}</label>
      <div /* contenteditable="true" */ className={styles.selectTag} onClick={toggleSelect}>
        <input className={styles.selectTagPlaceholder} type='text' id='selectMenuInput' defaultValue={value} placeholder='Select one Category ......' />
        <div className={styles.selectTagIcon}>
          <Image src={open ? '/assets/images/chevron-up.svg' : "/assets/images/chevron.svg"} width={15} height={15} alt="chevron.svg" />
        </div>
      </div>
      <ul style={{ display: open ? 'block' : 'none' }}>
        {options && options.map((option) => (
          <li key={option?.id} onClick={(e) => handleValue(e)} data-value={option?.slug} className={styles.selectOption}>
            <div className={styles.optionIcon}>
              <Image src={menuCategoryDumb?.[option.slug].icon} width={35} height={35} alt={`category ${option.slug} icon`} />
            </div>
            {option?.title}


          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectMenu