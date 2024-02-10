"use client"

import styles from './authLinks.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import UserAvatar from '../userAvatar/UserAvatar'




const AuthLinks = () => {

    const [open, setOpen] = useState()
    // temporary
    const {status,data} = useSession()
useEffect(()=>{
    console.log({status});
},[status])
    return (
        <>
            <StatusComponent status={status} />
            <div className={styles.burger} onClick={()=>setOpen(!open)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            {open ? (
                <div className={styles.mobileMenu}>
                    {['Home', 'Contact', 'About'].map((link,index) => (
                        <Link className={styles.link} href={`/${link.toLocaleLowerCase()}`} key={index}>{link}</Link>
                    ))}
                    <StatusComponent status={status} />
                </div>
            ) : null}

        </>
    )
}

const StatusComponent = ({ status }) => {
    return status !== "authenticated" ? (
         <Link className={styles.link} onClick={()=> localStorage.setItem('loghis',window.location.pathname)} href='/login'>Login</Link>
     ) : (
         <>
             <Link className={styles.link} href='/write'>Write</Link>
             <UserAvatar />
             <span className={styles.link} onClick={()=>signOut()}>Logout</span>
         </>
     )
 }

export default AuthLinks