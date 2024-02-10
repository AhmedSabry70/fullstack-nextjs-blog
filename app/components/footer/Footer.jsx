import Image from 'next/image'
import styles from './footer.module.css'
import Link from 'next/link'

const Footer = () => {
        return (
                <div className={styles.container}>
                        <div className={styles.info}>
                                <div className={styles.logo}>
                                        <Image className={styles.logoImage} src='/assets/images/bg/bg3.jpg' alt='blog logo' width={50} height={50} blurDataURL="/assets/images/bg/bg3.jpg" placeholder="blur"/>
                                        <h1 className={styles.logoText}> Ahmed Sabry blog</h1>
                                </div>
                                <p className={styles.desc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum quam officiis reprehenderit rerum impedit hic qui, doloremque doloribus tenetur non corrupti expedita aut magnam, laborum mollitia repudiandae vitae dolore ex harum cupiditate repellat suscipit soluta? Cupiditate, optio. Adipisci, excepturi natus?</p>
                                <div className={styles.icons}>
                                        <Image src='/assets/images/social-media/icons8-facebook.svg' alt='facebook' width={18} height={18} />
                                        <Image src='/assets/images/social-media/icons8-instagram.svg' alt='instagram' width={18} height={18} />
                                        <Image src='/assets/images/social-media/icons8-linkedin.svg' alt='linkedin' width={18} height={18} />
                                        <Image src='/assets/images/social-media/icons8-twitter.svg' alt='twitter' width={18} height={18} />
                                        <Image src='/assets/images/social-media/icons8-youtube.svg' alt='youtube' width={18} height={18} />
                                </div>

                        </div>
                        <div className={styles.links}>
                                <div className={styles.list}>
                                        <span className={styles.listTitle}>Links</span>
                                        <Link href='/' >Home</Link>
                                        <Link href='/' >Blog</Link>
                                        <Link href='/' >About</Link>
                                        <Link href='/' >Contact</Link>
                                </div>

                                <div className={styles.list}>
                                        <span className={styles.listTitle}>Tags</span>
                                        <Link href='/' >Style</Link>
                                        <Link href='/' >Food</Link>
                                        <Link href='/' >Fashion</Link>
                                        <Link href='/' >Coding</Link>
                                        <Link href='/' >Culture</Link>
                                </div>

                                <div className={styles.list}>
                                        <span className={styles.listTitle}>Socail</span>
                                        <Link href='/' >Facebook</Link>
                                        <Link href='/' >Youtube</Link>
                                        <Link href='/' >LinkedIn</Link>
                                        <Link href='/' >Twitter</Link>
                                        <Link href='/' >Instagram</Link>
                                        <Link href='/' >TikTok</Link>
                                </div>


                        </div>
                </div>
        )
}


export default Footer