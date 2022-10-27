var axios = require('axios');

export default async function handler(req, res) {
    var config = {
        method: 'get',
        url: `${process.env.BACKEND_URL}/products/categories`,
        headers: { }
    };
    
    
    await axios(config)
    .then(function (response) {
        res.status(200).json({"categories": response.data})
    })
    .catch(function (error) {
        res.status(500).json({error: error})
        
    });

    
}
