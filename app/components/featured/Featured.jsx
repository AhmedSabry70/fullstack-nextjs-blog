import Image from 'next/image'
import styles from './featured.module.css'
import Link from 'next/link'

const Featured = () => {
    return (

        <div className={styles.container}>
            <h1 className={styles.title}>
                <b className={styles.bold}>Articles</b>
                <br />
                <p className={styles.overline}>Create any blog page you wish.</p>
            </h1>

            <div className={styles.post}>
                <div className={styles.imageContainer} >
                    <Image 
                    src='/assets/images/bg/bg3.jpg' 
                    alt="post image" blurDataURL="/assets/images/bg/bg3.jpg" 
                    placeholder="blur" 
                    priority 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                 
                    className={styles.image} />

                </div>
                <div className={styles.postBody}>
                    <h1 className={styles.postTitle}> The 37 Best Websites To Learn Something New</h1>
                    <div className={styles.postMeta}>
                        <p className={styles.postTag}>lifeStyle</p>
                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                <svg className={styles.star} fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                                <svg className={styles.star} fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                                <svg className={styles.star} fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                                <svg className={styles.star} fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                                <svg className={styles.star} fill='white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                            </div>
                            <div className={styles.rate}>4.9</div>
                        </div>
                        <div className={styles.postVote}>129 Votes</div>
                    </div>
                    <p className={styles.postDesc}>
                        Forget overpriced shools, long days in a crowded classroom, and pitifully poor results. These websites and apps cover myriads of science, and technology topics.
                    </p>
                    <p className={styles.postDesc}>The will teach you practically anything, from making hummus to building apps in node.js. most of them for free.</p>
                    <button className={styles.button}>
                        Read More
                    </button>
                </div>
            </div>

        </div>

    )
}


export default Featured