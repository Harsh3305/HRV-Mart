import { useState } from "react";
import Categories from "../components/categories"
import ProductSection from "../components/product_section";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;
  async function getProducts() {
    if (loading == true) {
      return;
    }
    if (nextIndex == null || nextIndex == "null") {
      setProducts(products)
    }
    else {
      const host = process.env.URL;
      var path = ""
      if (host == undefined) {
        path = `/api?index=${nextIndex}&pageSize=${pageSize}`
      }
      else {
        path = `${host}/api?index=${nextIndex}&pageSize=${pageSize}`
      }
      setLoading(true);
      const data = await apiCall(path);
      setNextIndex(data.nextIndex)
      setLoading(false)
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
      {getLoadingDiv()}
    </div>
  )
  function getLoadingDiv() {
    if (loading) {
      return (<div>
        Loading Products...
      </div>);
    }
    else {
      return (<button className={styles.loadButton} onClick={() => {
        getProducts()
      }}>Load More product ⏳</button>);
    }
  }
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