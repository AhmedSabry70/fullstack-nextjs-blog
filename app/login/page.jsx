"use client"


import { useEffect, useLayoutEffect, useState } from 'react'

import Link from 'next/link'
import styles from './loginPage.module.css'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

const inputInit = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(inputInit);
  const prevUlr = localStorage.getItem('loghis');
  
 useLayoutEffect(() => {
    if(status === 'authenticated'){
     
        if (prevUlr === '/login' || prevUlr === null|| prevUlr === '/write') return redirect('/')
        return redirect(prevUlr)
        
    }
  }, [status]) 

  if (status === 'loading') return <h1 className={styles.loading}>Loading.....</h1>


  const handleInputs = ({ target }) => {

    const { name, value } = target;

    return setUserInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = userInfo

    if (!email || !password) return
    
    try {
      let res = await signIn('credentials', { redirect: false, email, password })
      if (!res.ok) {

        return console.log({ res });

      }

      const form = e.target
      form.reset()

      if(prevUlr === '/login' || prevUlr === null ) return router.replace('/');
        return router.replace(prevUlr) 
      

    } catch (error) {
      console.log('error during signin ', error);
    }
    

  }




  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <div className={styles.imageContainer}>
            <Image src='/assets/images/bg/bg3.jpg'
              blurDataURL="URL"
              priority
              placeholder="blur"
              alt='login image'
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}

            />
          </div>
          <Link href={'/register'} className={styles.singupAction}>
            Create an account
          </Link>
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>Log in</h1>
          <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
            <input onChange={e => handleInputs(e)} type="email" name="email" id="" className={styles.input} placeholder='Your E-mail' />
            <input onChange={e => handleInputs(e)} type="text" name="password" id="" className={styles.input} placeholder='Password' />
            <div className={styles.rememberdiv}>

              <input type="checkbox" name="" id="rememberMeBtn" />
              <label htmlFor="rememberMeBtn" className={styles.label}> Remember Me</label>
            </div>


            <button className={styles.button} /* onClick={() => signIn("credentials")} */>Log In</button>
          </form>

          <div className={styles.social}>
            <span className={styles.caption}>Or login with </span>
         <div><Image src='/assets/images/social-media/icons8-facebook.svg' alt='facebook' width={24} height={24} /></div>
            <div><Image src='/assets/images/social-media/icons8-instagram.svg' alt='instagram' width={24} height={24} /></div>
            <div onClick={() => signIn('github')}><Image src='/assets/images/social-media/icons8-linkedin.svg' alt='linkedin' width={24} height={24} /></div>
            <div><Image src='/assets/images/social-media/icons8-twitter.svg' alt='twitter' width={24} height={24} /></div>
            <div onClick={() => signIn('google')}><Image src='/assets/images/social-media/icons8-youtube.svg' alt='youtube' width={24} height={24} /></div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage