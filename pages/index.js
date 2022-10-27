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

export async function getStaticProps() {
  const res = await fetch(`${process.env.URL}/api/categories`)
  const posts = await res.json()
  const categories = posts.categories;
    return {
    props: {
      categories
    },
  }
}
