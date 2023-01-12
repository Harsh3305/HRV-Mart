export default async function handler(req, res) {
    fetch(`${process.env.BACKEND_URL}/products`)
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(error => res.status(500).json("Something went wrong"))
}