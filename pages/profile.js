import Image from "next/image"
import styles from "../styles/Profile.module.css"

export default function Profile ({user}) {
    
    try {
        var name = user.name
        var email = user.email
        var image = user.image
    } catch (error) {
        var name = "User"
        var email = "user@test.com"
        var image = "/profile.svg"
    }
    return <div className={styles.main}>
        <div className={styles.card}>
            <div className={styles.left}>
                <Image src={image}
                height={300} width={300}
                 className={styles.image}/>
                <h2>{email}</h2>
            </div>
            <hr/>
            <div className={styles.right}>
                <h1>Profile</h1>
                <div>
                    <div className={styles.pair}>
                        <div className={styles.key}>
                            Name: 
                        </div>
                        <div className={styles.value}>
                            {name}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}
export async function getServerSideProps({ req, res }) {
    try {
        const result = await fetch(`${process.env.URL}/api/profile`, {
            headers: {
              cookie: req.headers.cookie || "",
            },
          })
        
        const user = await result.json()
        // console.log({user:user})
        return {
            props: {
                user
            },
        }
    }
    catch (error) {
        return {
            props:{}
        }
    }
}