import Link from 'next/link'
import styles from './categoryList.module.css'
import Image from 'next/image'
import { categoriesDump, menuCategoryDumb } from '@/data/categoryDump'

const getData = async () => {
    let res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",     
      
    })



    if (!res.ok) {  
        return  res=[]
        throw new Error('failed coz there some thing is wrong')    
    }

    return  res.json()
   
}

const CategoryList = async () => {
    const categories = await getData()


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>
                {categories && categories.map((category) => (
                    <Link
                        key={category?.id}
                        style={{ backgroundColor: menuCategoryDumb[category?.slug].bg }}
                        className={styles.category}
                        href={category?.path || menuCategoryDumb[category?.slug].path}
                    >
                        {category?.img ? <Image
                            className={styles.image}
                            src={category?.img}
                           width={50}
                           height={50} 
                            alt='category'
                            blurDataURL="URL"
                            priority
     

                        /> : null}
                        {category?.title}
                    </Link>
                ))}




            </div>
        </div>
    )
}


export default CategoryList