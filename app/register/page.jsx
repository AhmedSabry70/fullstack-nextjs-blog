"use client"

import Link from 'next/link'
import styles from './registerPage.module.css'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const inputInit = {
    username: '',
    email: '',
    password: '',
}

const RegisterPage = () => {
    const { data, status } = useSession()

    const router = useRouter()

    const [userInfo, setUserInfo] = useState(inputInit);
    /* if (status === 'loading') return <div className={styles.loading}>Loading.....</div>
    if (status === 'authenticated') return router.push('/') */


    const handleInputs = ({ target }) => {

        const { name, value } = target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password } = userInfo
        if (!username || !email || !password) return
        try {
            let res = await fetch('http://localhost:3000/api/register', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(userInfo), // body data type must match "Content-Type" header
            });


            const resPars = await res.json()

            if (res.ok) {
                const form = e.target
                form.reset()

                router.push('/')

            } else {
                console.log(resPars.message)
            }
        } catch (error) {
            console.log('error during registration ', error);
        }

    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.leftSide}>
                    <div className={styles.imageContainer}>
                        <Image
                            src='/assets/images/bg/bg3.jpg'
                            alt='login image'
                            //blurDataURL="URL"
                            //placeholder="blur"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.image} 
                            priority={true}
                            />
                    </div>
                    <Link href={'/'} className={styles.singupAction}>
                        Create an account
                    </Link>
                </div>
                <div className={styles.rightSide}>
                    <h1 className={styles.title}>Register</h1>
                    <form className={styles.registerForm} onSubmit={e => handleSubmit(e)}>

                        <input onChange={e => handleInputs(e)} type="text" name="username" id="" className={styles.input} placeholder='user name' />
                        <input onChange={e => handleInputs(e)} type="email" name="email" id="" className={styles.input} placeholder='Your E-mail' />
                        <input onChange={e => handleInputs(e)} type="text" name="password" id="" className={styles.input} placeholder='Password' />

                        <div className={styles.rememberdiv}>

                            <input type="checkbox" name="" id="rememberMeBtn" />
                            <label htmlFor="rememberMeBtn" className={styles.label}> Remember Me</label>
                        </div>


                        <button className={styles.button} >Register</button>
                    </form>

                    <div className={styles.social}>
                        <span className={styles.caption}>Or login with </span>
                        <div><Image blurDataURL="URL" placeholder="blur" src='/assets/images/social-media/icons8-facebook.svg' alt='facebook' width={24} height={24} /></div>
                        <div><Image blurDataURL="URL" placeholder="blur" src='/assets/images/social-media/icons8-instagram.svg' alt='instagram' width={24} height={24} /></div>
                        <div><Image blurDataURL="URL" placeholder="blur" src='/assets/images/social-media/icons8-linkedin.svg' alt='linkedin' width={24} height={24} /></div>
                        <div><Image blurDataURL="URL" placeholder="blur" src='/assets/images/social-media/icons8-twitter.svg' alt='twitter' width={24} height={24} /></div>
                        <div onClick={() => signIn('google')}><Image blurDataURL="URL" placeholder="blur" src='/assets/images/social-media/icons8-youtube.svg' alt='youtube' width={24} height={24} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default RegisterPage