import { useRouter } from 'next/router'
import ProductOverview from '../../components/product_overview';
import styles from "../../styles/Search.module.css"

export default function Search({ products }) {
    const router = useRouter()

    return <div className={styles.main}>
        {
            products.map(
                product => (<ProductOverview product={product} key={product.id} />)
            )
        }
    </div>
}
export async function getServerSideProps(content) {
    const searchQuery = content.params.searchQuery;
    const res = await fetch(`${process.env.URL}/api/search?query=${searchQuery}`)
    const products = await res.json()

    return {
        props: {
            products
        },
    }
}