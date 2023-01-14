export default async function handler(req, res) {
    // console.log(req.query);
    var query = "";
    for (const a in req.query) {
        query += `${a}=${req.query[a]}&`
    }
    if (query.length != 0) {
        query = query.substring(0, query.length - 1);
    }
    const path = `${process.env.BACKEND_URL}/products?${query}`;
    console.log(path)
    fetch(path, {

    })
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(error => res.status(500).json("Something went wrong"))
}