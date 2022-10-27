import Link from "next/link";
import styles from "../styles/Categories.module.css"
export default function Categories(categories) {
    console.log(categories.length);
    return (
        <div className={styles.main}>
            <div className={styles.categories}>
                {
                    categories.map(category => (
                        <div key={category}>
                            <Link href={`/category/${category}`}>
                                <a className={styles.category} >
                                    {category}
                                </a>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}