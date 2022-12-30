import styles from "../styles/NavBar.module.css";
import Link from 'next/link'
import Router from "next/router";
import { useState } from "react";
import { getCookie, removeCookies } from 'cookies-next';
import { toast } from "react-toastify";
import Image from "next/image";
import { BsCart2,  } from 'react-icons/bs';

export default function NavBar() {
    const [searchTest, setSearchTest] = useState("")
    const token = getCookie("f-access-token");

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
            {login(token)}
        </div>
    </div>
}
function login(token) {
    if (token == null) {
        return <button onClick={() => Router.push("/login")}>
            Login In
        </button>
    }
    else {
        return <div className={styles.rightL}>
            <Link href="/profile">
                <a>
                    <Image className={styles.profile} src="/profile.svg" width={50} height={50} />
                </a>
            </Link>
            <button
                className={styles.cart}
                onClick={() => Router.push("/cart")}
            >
                <BsCart2 />
                {" "}Cart
            </button>

            <button onClick={() => {
                signout()
            }}>
                Sign Out
            </button>
        </div>

    }
}
async function signout() {
    fetch(`/api/signout`)
        .then((a) => {
            removeCookies("f-access-token");
            toast(
                "Signout Successfully",
                {
                    type: toast.TYPE.INFO,
                    autoClose: 2000
                }
            );
            Router.reload();
        })
        .catch()
}