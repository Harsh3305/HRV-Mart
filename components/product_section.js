import ProductOverview from "./product_overview";
import styles from "../styles/ProductSection.module.css";

export default function ProductSection({ products }) {
  return <div className={styles.main}>
    <div className={styles.products}>
      {
        products.map(
          product => (<ProductOverview product={product} key={product.id} />)
        )
      }
    </div>
  </div>
}