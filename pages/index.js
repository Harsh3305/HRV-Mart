import Categories from "../components/categories"
import styles from "../styles/Home.module.css"
import absoluteUrl from 'next-absolute-url'

export default function Home({categories}) {
  console.log(categories)
  return (
    <div className={styles.main}>
      {Categories(categories)}
  </div>
  )
}

export async function getServerSideProps() {
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/categories`)
  const posts = await res.json()
  const categories = posts.categories;
  // console.log(categories)
  return {
    props: {
      categories
    },
  }
}
