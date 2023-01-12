import { useState } from "react";
import Categories from "../components/categories"
import ProductSection from "../components/product_section";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const pageSize = 10;
  async function getProducts() {
    if (nextIndex == null || nextIndex == "null") {
      setProducts(products)
    }
    else {
      const data = await apiCall(`/api?index=${nextIndex}&pageSize=${pageSize}`);
      setNextIndex(data.nextIndex)
      const newProduct = products.concat(data.data)
      setProducts(newProduct)
    }
  }
  if (nextIndex == 0) {
    getProducts()
  }
  return (
    <div className={styles.main}>
      <ProductSection products={products} />
      <button className={styles.loadButton} onClick={() => {
        getProducts()
      }}>Load More product</button>
    </div>
  )

}
async function apiCall(path) {
  const res = await fetch(path)
  try {
    const result = await res.json();
    return result;
  }
  catch (error) {
    console.log({
      path: path,
      error: error
    })
    return [];
  }
}