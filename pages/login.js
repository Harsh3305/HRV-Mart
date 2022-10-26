import styles from "../styles/Login.module.css"
import { useSession, signIn} from "next-auth/react"
import Router from "next/router";

export default function Login() {
    const { data: session } = useSession();
    if (session) {
        Router.push("/");
    }
    return <div className={styles.main}>

        <button onClick={() => signIn("google")} className={styles.button}>
            <a>Sign In with Google</a>
        </button>
    </div>
}