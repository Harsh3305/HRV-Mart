import Categories from "../components/categories"
import ProductSection from "../components/product_section";
import styles from "../styles/Home.module.css"

export default function Home({categories, products}) {
  return (
    <div className={styles.main}>
      {/*
      * There is a bug in Categories. It is adding a scrollbar in home page.
      */}
      {Categories(categories)}
      <ProductSection title={"Recommended for You"} products={products}/>
      {/* <ProductSection title={"Trending"} products={products}/>
      <ProductSection title={"Based on your Search History"} products={products}/> */}
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
  try {
    const result = await res.json();
    return result;
  }
  catch (error) {
    return [];
  }
  
}