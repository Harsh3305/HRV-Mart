import styles from "../styles/NavBar.module.css";
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Router from "next/router";
import { useState } from "react";

export default function NavBar() {
    const { data: session } = useSession();
    const [searchTest, setSearchTest] = useState("")

    const handleKeyDown = event => {

        if (event.key === 'Enter') {

            console.log(searchTest);
            Router.push(`/search/${searchTest}`)
        }
    };

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
                onChange={(event) => {
                    console.log(event.target.value)
                    setSearchTest(event.target.value)
                    if (event.target.value.length >= 3) {
                        Router.push(`/search/${event.target.value}`)
                    }
                }}
                value={searchTest}
                onKeyDown={
                    handleKeyDown
                }
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
