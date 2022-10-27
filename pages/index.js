import Categories from "../components/categories"
import ProductSection from "../components/product_section";
import styles from "../styles/Home.module.css"

export default function Home({categories, products}) {
  console.log(products)
  return (
    <div className={styles.main}>
      {/* {Categories(categories)} */}
      <ProductSection title={"Recommended for You"} products={products}/>
      <ProductSection title={"Trending"} products={products}/>
      <ProductSection title={"Based on your Search History"} products={products}/>
  </div>
  )
}

export async function getStaticProps() {
  const categories = (await apiCall(`${process.env.URL}/api/categories`)).categories;
  const products = await apiCall(`${process.env.URL}/api`)
    return {
    props: {
      categories,
      products
    },
  }
}
async function apiCall (path) {
  const res = await fetch(path)
  const result = await res.json()
  return result
}