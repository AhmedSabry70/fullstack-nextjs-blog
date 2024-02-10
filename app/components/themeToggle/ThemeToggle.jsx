"use client"

import Image from 'next/image'
import styles from './themeToggle.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemContext'

const ThemeToggle =()=> {
    const {theme,toggle} = useContext(ThemeContext)


        return (
            <div className={styles.container} onClick={toggle} style={theme==='dark'?{background:'white'}:{background:"#0f172a"}}>
                  <Image className={styles.icons} src="/assets/images/icons8-moon.png"  alt='' width={14} height={14} style={theme ==='dark'? {opacity:'0'}:{opacity:'1'}}/>
                  {/* <span className={styles.ball} style={theme ==='dark'?{left:'1px',backgroundColor:'#ef172a'}:{right:'1px',backgroundColor:'white'}}></span> */}
                  { <span className={styles.ball} style={theme ==='dark'?{backgroundColor:'#4a4646', translate :'1px'}:{backgroundColor:'white',translate:'24px'}}></span> }
                  <Image className={styles.icons} src="/assets/images/icons8-sun.png"  alt='' width={14} height={14} style={theme ==='dark'? {opacity:'1'}:{opacity:'0'}}/>
            </div>
        )
}


export default ThemeToggle