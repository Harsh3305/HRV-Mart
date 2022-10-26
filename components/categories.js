import styles from "../styles/Categories.module.css"
export default function Categories( categories) {
    console.log(categories.length);
    return (
        <div className={styles.main}>
            <div className={styles.categories}>
                {
                    categories.map(category => (
                        <div className={styles.category} key={category}>
                            {category}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
// export async function getStaticProps() {
//     console.log("in categories");
//     const res = await fetch('/api/categories')
//     const posts = await res.json()
//     console.warn(posts)
//     const categories = posts.categories;

//     return {
//       props: {
//         categories
//       },
//     }
// }
  