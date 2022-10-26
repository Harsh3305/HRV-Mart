import styles from "../styles/NavBar.module.css";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Router from "next/router";

export default function NavBar() {
    const { data: session } = useSession();
    return <div className={styles.navbar}>
        <div className={styles.left}>
            {
                session ? (
                    <div>
                        Hi! {session.user.name}
                    </div>
                ) : (
                    <div></div>
                )
            }
        </div>
        <div className={styles.center}>
            <Link href="/">
                <a>HRV-Mart</a>
            </Link>
        </div>
        <div className={styles.right}>
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
