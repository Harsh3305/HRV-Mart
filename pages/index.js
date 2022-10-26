import Categories from "../components/categories"
import styles from "../styles/Home.module.css"
export default function Home({post}) {
  return (
    <div className={styles.main}>
      <Categories/>
  </div>
  )
}
