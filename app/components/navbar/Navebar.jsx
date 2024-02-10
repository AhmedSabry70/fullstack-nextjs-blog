import Image from 'next/image'
import styles from './navbar.module.css'
import Link from 'next/link'
import ThemeToggle from '../themeToggle/ThemeToggle'
import AuthLinks from '../authLinks/AuthLinks'

const Navbar =()=> {
        return (
            <div className={styles.container}>
                   <div className={styles.social}>
                    <Image src='/assets/images/social-media/icons8-facebook.svg' alt='facebook' width={24} height={24} />
                    <Image src='/assets/images/social-media/icons8-instagram.svg' alt='instagram' width={24} height={24} />
                    <Image src='/assets/images/social-media/icons8-linkedin.svg' alt='linkedin' width={24} height={24} />
                    <Image src='/assets/images/social-media/icons8-twitter.svg' alt='twitter' width={24} height={24} />
                    <Image src='/assets/images/social-media/icons8-youtube.svg' alt='youtube' width={24} height={24} />

                   </div>
                   <div className={styles.logo}>
                            AhmedSabry
                   </div>
                   <div className={styles.links}>
                    <ThemeToggle />

                   
                    {['Home','Contact' , 'About'].map((link)=> (
                        <Link className={styles.link}  href={link==='Home'? '/' :`/${link.toLocaleLowerCase()}`} key={link}>{link}</Link>
                    ))} 
                    <AuthLinks />
                   </div>
            </div>
        )
}


export default Navbar