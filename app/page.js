import styles from './page.module.css'
import Featured from './components/featured/Featured'
import CategoryList from './components/categoryList/CategoryList'
import CardList from './components/cardList/CardList'
import Menu from './components/menu/Menu'



export default function Home({searchParams}) {
  
const currentPage = parseInt(searchParams.page) || 1,
recordsPerPage = 5;



  return (
    <div>
     
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={currentPage} recordsPerPage={recordsPerPage} />
        <Menu />
      </div>
      
      
    </div>

  )
}
