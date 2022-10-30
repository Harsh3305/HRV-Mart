export default async function handler (req, res) {
    const { category } = req.query
    fetch(`${process.env.BACKEND_URL}/products/category/${category}`)
    .then(result=>result.json())
    .then(json=>res.status(200).json(json))
    .catch(error => res.status(500).json("Something went wrong!!"))
}