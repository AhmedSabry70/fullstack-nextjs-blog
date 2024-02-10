 "use client"


import Link from 'next/link'
import styles from './comments.module.css'
import Image from 'next/image'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useState } from 'react'


const fetcher = async(...args) => await fetch(...args).then(res => res.json())

const Comments = ({postSlug}) => {
    const {status} = useSession()
const [desc, setDesc] = useState('')

    

    const {data, mutate, error,isLoading} =useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher)
  
    const handleSubmit = async(e)=> {
        e.preventDefault()
       await fetch('/api/comments',{
            method:"POST",
            body:JSON.stringify({desc,postSlug})
        })
        mutate()
        setDesc('')
    }

    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Comments</h1>
            {status === 'authenticated' ? (
                <div className={styles.write}>
                    <textarea placeholder='Write a comment.....' className={styles.input} value={desc} onChange={({target})=>setDesc(target.value)}/>
                    <button className={styles.button} onClick={(e)=> handleSubmit(e)}>
                        Send
                    </button>
                </div>
            ) : (
                <Link href='/login' >Login to write a comment</Link>
            )}

            <div className={styles.comments}>
                {error ? <h3>failed to load</h3>:isLoading ? <h3>Loading ......</h3>: (
                    data.map((item, index) => (
                    <div className={styles.comment} key={index}>
                        <div className={styles.user}>
                            { item?.user.image ? <Image 
                             src={item?.user.image}
                             blurDataURL={item?.user.image}
                             quality={75}
                             priority 
                            width={50} 
                            height={50} 
                            alt='avatar' 
                            className={styles.userImage} 
                            />: null}

                            <div className={styles.userInfo}>
                                <div className={styles.username}>{item?.user.name}</div>
                                <div className={styles.date}>{new Date(item?.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <p className={styles.desc}>
                            {item?.desc}
                        </p>
                    </div>
                )))}
           
            </div> 
        </div>
    )
}

export default Comments 

