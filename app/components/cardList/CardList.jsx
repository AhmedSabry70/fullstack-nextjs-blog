import styles from './cardList.module.css'
import Link from 'next/link'
import Card from '../card/Card'
import Pagination from '../pagination/Pagination'

const getData = async (page,cat) => {
    let res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat||''}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        
        throw new Error('failed')
    }
    return res.json() 
}



const CardList = async ({ page ,recordsPerPage,cat}) => {

    const { posts, count } = await getData(page,cat)
    const postPerPage = 5
    const hasPrev = recordsPerPage * (page - 1) > 0
    const hasNext = recordsPerPage * (page - 1) + recordsPerPage < count
    return (

        <div className={styles.container}>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
                {posts && posts.map((post) => (
                    <Card post={post} key={post.id}/>
                ))}


                <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
            </div>

        </div>

    )
}



export default CardList