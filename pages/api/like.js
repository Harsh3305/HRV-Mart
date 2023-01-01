const axios = require('axios');
import { setCookie } from 'cookies-next';

export default async function like (req, res) {
    const token = getCookie("access-token", {
        req: req,
        res: res
    });

    if (req.method == "GET") {

    }
    else {
        res.status(404).send("Request not fiund")
    }
}