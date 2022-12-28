import { useState } from "react";
import styles from "../styles/SignUp.module.css";
import Router from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    return (<div className={styles.main}>
        <div className={styles.card}>
            <div className={styles.title}>
                Sign Up
            </div>
            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => { setName(event.target.value) }}
                />
                <input
                    type="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button
                    className={styles.button}
                    onClick={() => {
                        login();
                    }}
                >
                    Submit
                </button>
            </div>
            {getErrorMessage()}
            <div>
                Already have an account {" "}
                <Link href="/login">
                    <a>
                        Login
                    </a>
                </Link>
            </div>
        </div>
    </div>)

    function getErrorMessage() {
        if (status == "...") {
            return <div className={styles.loading}>
                Loading ...
            </div>
        }
        else if (status == "") {

        }
        else {
            return <div className={styles.error}>
                {status}
            </div>
        }
    }

    async function login() {
        setStatus("...");
        var data = JSON.stringify({
            name: name,
            email: email,
            password: password
        });

        const response = (await fetch(`/api/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: data
        }))
        console.log(response)
        if (response.status != 200) {
            setStatus(await response.text());
            toast("Account already exist", {
                autoClose: 3000,
                draggable: true,
                type: toast.TYPE.ERROR
            })
            
        }
        else {
            setStatus("");
            toast("Account created successfully", {
                autoClose: 3000,
                draggable: true,
                type: 'success'
            });
            toast("Please login", {
                autoClose: 3000,
                draggable: true,
                type: toast.TYPE.INFO
            });
            
            Router.push("/login")
        }
    }
}
