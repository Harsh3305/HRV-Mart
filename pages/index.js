import { useState } from "react";
import Categories from "../components/categories"
import ProductSection from "../components/product_section";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  async function getProducts () {

  }
  return (
    <div className={styles.main}>
      <ProductSection title={"Recommended for You"} products={products} />
    </div>
  )

}

// export async function getStaticProps() {
//   const categories = (await apiCall(`${process.env.URL}/api/categories`)).categories;
//   const products = (await apiCall(`${process.env.URL}/api`))
//   return {
//     props: {
//       categories,
//       products
//     },
//   }
// }
// async function apiCall(path) {
//   const res = await fetch(path)
//   try {
//     const result = await res.json();
//     return result;
//   }
//   catch (error) {
//     console.log({
//       path: path,
//       error: error
//     })
//     return [];
//   }
// }