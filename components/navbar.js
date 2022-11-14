import styles from "../styles/NavBar.module.css";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Router from "next/router";

export default function NavBar() {
    const { data: session } = useSession();
    return <div className={styles.navbar}>
        <div className={styles.left}>
            <Link href="/">
                <a>HRV-Mart</a>
            </Link>
        </div>
        <div className={styles.center}>
            <input
                placeholder="Search Products..."
                className={styles.searchBar}
            />
        </div>
        <div className={styles.right}>
            <button
                className={styles.cart}
                onClick={() => Router.push("/cart")}
            >
                Cart
            </button>
            {
                session ? (
                    <button onClick={() => signOut()}>
                        <a>Sign Out</a>
                    </button>
                ) : (
                    <button onClick={() => Router.push("/login")}>
                        <a>Login In</a>
                    </button>
                )
            }
        </div>
    </div>
}
