import Image from "next/image";
import styles from "../styles/ProductOverview.module.css";

export default function ProductOverview({ product }) {
    return <div className={styles.main} id={product.id}>
        <div className={styles.title}>
            {product.title}
        </div>
        <div className={styles.image}>
            <Image  src={product.image} height={400} width={400}/>
        </div>
        <div className={styles.price}>
            Price: ₹ {product.price}
        </div>
        
    </div>
}