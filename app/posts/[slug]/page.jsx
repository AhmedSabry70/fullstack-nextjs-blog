
import Image from 'next/image'
import Menu from '../../components/menu/Menu'
import styles from './singlePage.module.css'
import Comments from '../../components/comments/Comments'



const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error('failed')
    }

    return res.json()
}

const SinglePage = async ({ params }) => {

    const { slug } = params
    const data = await getData(slug)

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{data?.title}</h1>
                    <div className={styles.user}>
                        <div className={styles.userImageContainer}>
                            {data?.user.image ? <Image
                                src={data?.user.image}
                                alt='user image'
                                priority
                                blurDataURL={data?.user.image}
                                placeholder="blur"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover', borderRadius: '50%' }}

                            />
                                :
                                null}
                        </div>
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>{data?.user.name}</span>
                            <span className={styles.date}>{new Date(data?.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    {data?.featuredImage && <Image src={data?.featuredImage}
                        alt='post image'
                        blurDataURL={data?.featuredImage}
                        priority
                        placeholder="blur"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        style={{ objectFit: 'cover' }} />}
                </div>
            </div>
            <div className={`contentMenu-grid ${styles.content}`}>
                <div>
                    <div className={styles.post}>
                        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: data?.content }} />


                    </div>

                    <Comments postSlug={slug} />
                </div>

                <Menu />
            </div>
        </div>
    )
}

export default SinglePage