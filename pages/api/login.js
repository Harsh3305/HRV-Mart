const axios = require('axios');
import { setCookie } from 'cookies-next';

export default async function login(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    var data = JSON.stringify({
        "email": email,
        "password": password
    });

    var config = {
        method: 'post',
        url: `${process.env.BACKEND_URL}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            const data = response.data;
            const jwt = data.jwt;

            setCookie('access-token', jwt, {
                req: req,
                res: res,
                httpOnly: true,
                maxAge: 60 * 10,
            });

            res.status(200).send("Login successfully");
        })
        .catch(function (error) {
            // console.log(error)
            res.status(500).send("User does not exist");
        });
}