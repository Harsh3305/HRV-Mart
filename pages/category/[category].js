import { useRouter } from 'next/router'
import ProductOverview from '../../components/product_overview';
import styles from "../../styles/Category.module.css"

export default function Category({ products }) {
  const router = useRouter()
  const { category } = router.query;

  return <div>
    <div className={styles.title}>
      Category : {category}
    </div>
    <div className={styles.products}>
      {
        products.map(
          product => (<ProductOverview product={product} key={product.id}/>)
        )
      }
    </div>
  </div>

}
export async function getServerSideProps(content) {

  const category = content.params.category;
  const res = await fetch(`${process.env.URL}/api/category/${category}`)
  const products = await res.json()

  return {
    props: {
      products
    },
  }
}