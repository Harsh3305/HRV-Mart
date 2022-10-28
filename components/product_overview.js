import Image from "next/image";
import Router from "next/router";
import styles from "../styles/ProductOverview.module.css";
import loading from "../public/loading.png"
export default function ProductOverview({ product }) {
    return <div className={styles.main} id={product.id} onClick={()=>(Router.push(`/product/${product.id}`))}>
        <div className={styles.title}>
            {product.title}
        </div>
        <div className={styles.image}>
            <Image  src={product.image} height={400} width={400} blurDataURL={loading}
   placeholder="blur"/>
        </div>
        <div className={styles.price}>
            Price: ₹ {product.price}
        </div>
        
    </div>
}