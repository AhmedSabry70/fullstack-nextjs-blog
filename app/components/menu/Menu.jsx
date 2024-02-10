import Image from 'next/image'
import styles from './menu.module.css'
import Link from 'next/link'
import { categoriesDump, menuCategoryDumb } from '@/data/categoryDump'
const getData = async () => {
    let res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
    })

    if (!res.ok) {
        return  res=[]
        throw new Error('failed')
    }
    
   
    return res.json()
}

const Menu = async() => {
    const categories = await getData()
    return (

        <div className={styles.container}>
            <div>
                <h2 className={styles.subtitle}>"What's hot"</h2>
                <h1 className={styles.title}>Most Popular</h1>
                <div className={styles.items}>
                    {/* ["travel", "style", "fashion", "food", "culture", "coding"] */categories.map((category, id) => (
                        <Link key={id} className={styles.item} href='/'>

                            <div className={styles.postBody}>


                                <span className={styles.category} style={{ backgroundColor: menuCategoryDumb[category?.slug].bg }}>{category?.title}</span>



                                <h3 className={styles.posttitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>

                                <div className={styles.detail}>
                                    <span className={styles.username}>John Doe</span>
                                    <span> - </span>
                                    <span className={styles.date}>11.3.2024</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            <div>
                <h2 className={styles.subtitle}>Discover by topic</h2>
                <h1 className={styles.title}>Categories</h1>
                <div className={styles.categoryList}>

                    {categories.map((el, id) =>
                    (<Link key={id} href={menuCategoryDumb[el?.slug].path} className={styles.categoryItem} style={{ backgroundColor:menuCategoryDumb[el?.slug].bg }}>
                        {el.title}
                    </Link>)
                    )}



                </div>
            </div>

            <div>
                <h2 className={styles.subtitle}>Chosen by the editor</h2>
                <h1 className={styles.title}>Editors Pick</h1>
                <div className={styles.items}>

                    {categories.map((category, id) => (
                        <Link className={styles.item} key={id} href='/'>

                            <div className={styles.imageContainer}>
                                <Image 
                                className={styles.image} 
                                blurDataURL="/assets/images/bg/bg3.jpg" 
                                placeholder="blur" 
                                src='/assets/images/bg/bg3.jpg' alt='post image thumb' 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                quality={75}
                                priority 
                                />
                            </div>
                            <div className={styles.postBody}>


                                <span className={styles.category} style={{ backgroundColor: menuCategoryDumb[category?.slug].bg }}>{category?.title}</span>



                                <h3 className={styles.posttitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>

                                <div className={styles.detail}>
                                    <span className={styles.username}>John Doe</span>
                                    <span> - </span>
                                    <span className={styles.date}>11.3.2024</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

        </div>

    )
}


export default Menu