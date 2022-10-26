var axios = require('axios');

export default async function handler(req, res) {
    var config = {
        method: 'get',
        url: `${process.env.BACKEND_URL}/products/categories`,
        headers: { }
    };
    
    
    await axios(config)
    .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        res.status(200).json({"categories": response.data})
    })
    .catch(function (error) {
        // console.log(error);
        res.status(500).json({error: error})
        
    });

    
}
