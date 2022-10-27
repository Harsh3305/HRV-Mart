import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Product.module.css";

export default function Product({ product }) {
    const router = useRouter()
    const { productId } = router.query;
    return <div className={styles.main}>
        <div className={styles.title}>
            {product.title}
        </div>
        <div className={styles.product}>
            <div className={styles.image}>
                <Image src={product.image} height={400} width={400} />
            </div>

            <div className={styles.details}>
                <div className={styles.price}>
                    Price: ₹ {product.price}
                </div>
                <p className={styles.description}>
                    {product.description}
                </p>
                <button className={styles.cart}>
                    Add to Cart
                </button>
            </div>

        </div>

    </div>
}
export async function getServerSideProps(content) {
    const productId = content.params.productId;
    const res = await fetch(`${process.env.URL}/api/product/${productId}`)
    const product = await res.json()

    return {
        props: {
            product
        },
    }
}