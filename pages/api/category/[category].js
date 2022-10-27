export default async function handler (req, res) {
    fetch(`${process.env.BACKEND_URL}/products/category/jewelery`)
    .then(result=>result.json())
    .then(json=>res.status(500).json(json))
    .catch(error => res.status(500).json("Something went wrong!!"))
}