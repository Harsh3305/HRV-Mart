import { getSession } from "next-auth/react"
export default async function handler(req, res) {
    const session = await getSession({ req });
    const email = session.user.email;
    if (req.method == "GET") {
        fetch(`${process.env.BACKEND_URL}/order/${email}`)
        .then(result=>result.json())
        .then(json=>res.status(500).json(json))
        .catch(error => res.status(500).json("Something went wrong!!"))
    }
    else if (req.method == "POST") {
        // Purchase all itesm available in cart
        fetch(`${process.env.BACKEND_URL}/cart/purchase/${email}`)
        .then(result=>result.json())
        .then(json=>res.status(500).json(json))
        .catch(error => res.status(500).json("Something went wrong!!"))
    }
    else {
        res.status(404).send("Not found")
    }
}