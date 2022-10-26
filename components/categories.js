import styles from "../styles/Categories.module.css"
export default function Categories({ categories }) {
    return (
        <div className={styles.main}>
            <div className={styles.categories}>
                <div className={styles.category}>
                    {categories[0]}
                </div>
                <div className={styles.category}>
                    {categories[1]}
                </div>
                <div className={styles.category}>
                    {categories[2]}
                </div>
                <div className={styles.category}>
                    {categories[3]}
                </div>
                
            </div>
        </div>
    )
}
export async function getStaticProps() {
    console.log("in categories");
    const res = await fetch('/api/categories')
    const posts = await res.json()
    const categories = posts.categories;

    return {
      props: {
        categories
      },
    }
}