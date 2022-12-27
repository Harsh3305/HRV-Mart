const axios = require('axios');

export default async function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    var data = JSON.stringify({
        email: email,
        password: password,
        name: name,
        image: "",
        address: []
    });

    var config = {
        method: 'post',
        url: `${process.env.BACKEND_URL}/signUp`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send("User already exist")
        });
}