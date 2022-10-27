export default async function hndler (req, res) {
    fetch(`${process.env.BACKEND_URL}/products?limit=5`)
            .then(res=>res.json())
            .then(json=>res.status(200).json(json))
            .catch(error => res.status(500).json("Something went wrong"))
}