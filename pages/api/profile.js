import { getSession } from "next-auth/react"

export default async function handler (req, res) {
    const session = await getSession({ req });
    const email = session.user.email;
    fetch(`${process.env.BACKEND_URL}/user/${email}`)
            .then(res=>res.json())
            .then(json=>res.status(200).json(json))
            .catch(error => res.status(500).json(error))
    

}