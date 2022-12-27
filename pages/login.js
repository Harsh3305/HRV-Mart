import { useState } from "react";
import styles from "../styles/Login.module.css";
import { toast } from "react-toastify";
import Router from "next/router";
import { setCookie } from 'cookies-next';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    return (<div className={styles.main}>
        <div className={styles.card}>
            <div className={styles.title}>
                Login
            </div>
            <div className={styles.form}>
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
            email: email,
            password: password
        });

        const response = (await fetch(`/api/login`, {
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
            toast("User Not found", {
                autoClose: 3000,
                draggable: true,
                type: 'error'
            })
        }
        else {
            setCookie('f-access-token', "OK", {
                maxAge: 60 * 10
            })
            setStatus("");
            toast("Login successfully", {
                autoClose: 3000,
                draggable: true,
                type: 'success'
            })
            Router.push("/")
        }
    }
}
