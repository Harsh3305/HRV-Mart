import Categories from "../components/categories"
import styles from "../styles/Home.module.css"
export default function Home({categories}) {
  console.log(categories)
  return (
    <div className={styles.main}>
      {Categories(categories)}
      {/* <h1>reoihgoeir</h1> */}
  </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/categories')
  const posts = await res.json()
  const categories = posts.categories;
  // console.log(categories)
  return {
    props: {
      categories
    },
  }
}
