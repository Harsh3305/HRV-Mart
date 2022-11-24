import Image from "next/image";
import Router from "next/router";
import styles from "../styles/ProductOverview.module.css";

export default function ProductOverview({ product }) {
    return <div className={styles.main} id={product.id} onClick={()=>(Router.push(`/product/${product.id}`))}>
        <div className={styles.title}>
            {product.title}
        </div>
        <div className={styles.image}>
            <Image  src={product.image[0]} height={400} width={400}/>
        </div>
        <div className={styles.price}>
            Price: ₹ {product.price}
        </div>
        
    </div>
}