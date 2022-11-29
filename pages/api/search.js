import { getSession } from "next-auth/react"
export default async function handler(req, res) {
    if (req.method == "GET") {

        const query = req.query["query"]
        const path = `${process.env.BACKEND_URL}/products/search?query=${query}`
        fetch(path)
            .then(result => result.json())
            .then(json => res.status(200).json(json))
            .catch(error => res.status(500).send(error))
    }
    else {
        res.status(404).send("Not found")
    }
}