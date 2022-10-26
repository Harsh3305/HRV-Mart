import styles from "../styles/Footer.module.css";

export default function Footer  () {
    return <div className={styles.background}>
        <div className={styles.title}>
            🛒 HRV-Mart
        </div>
        
        <div className={styles.lower}>
            This website is created with ❤️ by <a href="https://github.com/Harsh3305">Harsh Verma</a>
        </div>
    </div>
}