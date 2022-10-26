import Categories from "../components/categories"
import styles from "../styles/Home.module.css"

export default function Home({categories}) {
  console.log(categories)
  return (
    <div className={styles.main}>
      {Categories(categories)}
  </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`/api/categories`)
  const posts = await res.json()
  const categories = posts.categories;
  // console.log(categories)
  return {
    props: {
      categories
    },
  }
}
