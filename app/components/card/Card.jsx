import Image from 'next/image'
import styles from './card.module.css'
import Link from 'next/link'

const Card = ({  post }) => {
    return (

        <div className={styles.container} key={post.id}>
            <div className={styles.imageContainer}>
                {post.featuredImage ? <Image className={styles.image} 
                    src={post.featuredImage}
                    blurDataURL={'/assets/images/bg/bg3.jpg'} 
                    placeholder="blur"
                    alt='post image thumb' 
                     fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    priority 

                    /> 
                    : null}
            </div>
            <div className={styles.postBody}>
                <div className={styles.detail}>
                    <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className='separator'> - </span>
                    <span className={styles.category}>{post.catSlug}</span>
                </div>
                <Link href={`posts/${post.slug}`}>

                    <h1 className={styles.title}>{post.title}</h1>
                </Link>
                <p className={styles.desc}>{post.desc.substring(0, 90)} ....</p>
                <Link className={styles.link} href={`posts/${post.slug}`}>Read More</Link>
            </div>


        </div>

    )
}


export default Card