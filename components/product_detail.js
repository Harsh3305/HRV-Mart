import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductDetails.module.css"

export default function ProductDetail({ name, price, quantity, link, image }) {
    return <div className={styles.main}>

        <Link href={link}>
            <a className={styles.details}>
                <Image className={styles.image} src={image} height={60} width={60} />
                <div className={styles.name}>
                {name}
                </div>
                <div className={styles.price}>
                    ₹ {price}
                </div>
                <div className={styles.quantity}>
                    Quantity:{quantity}
                </div>
            </a>
        </Link>
    </div>
}